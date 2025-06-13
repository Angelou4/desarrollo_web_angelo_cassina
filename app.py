from datetime import datetime
from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from models import db, Actividad, Region, Comuna, ContactarPor, Foto, ActividadTema, Comentario
from werkzeug.utils import secure_filename
import os
app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost/tarea2?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'clave-secreta'  # Necesario para usar flash()

# Inicializar SQLAlchemy
db.init_app(app)

# Página principal: muestra últimas 5 actividades agregadas
@app.route('/')
def index():
    actividades = Actividad.query.order_by(Actividad.id.desc()).limit(5).all()
    return render_template('index.html', actividades=actividades)

# Formulario para informar una nueva actividad
@app.route('/informar', methods=['GET', 'POST'])
def informar_actividad():
    if request.method == 'POST':
        datos = request.form

        # Validaciones del lado del servidor
        errores = []
        if not datos.get('comuna') or not datos.get('region'):
            errores.append("Debe seleccionar una región y una comuna.")
        if not datos.get('organizador') or len(datos.get('organizador')) > 200:
            errores.append("El nombre del organizador es obligatorio y debe tener máximo 200 caracteres.")
        if not datos.get('correo') or len(datos.get('correo')) > 100 or '@' not in datos.get('correo'):
            errores.append("Debe ingresar un correo electrónico válido y menor a 100 caracteres.")
        if datos.get('telefono') and not datos.get('telefono').startswith('+'):
            errores.append("El teléfono debe comenzar con '+'.")

        try:
            fecha_inicio = datetime.fromisoformat(datos.get('fecha_inicio'))
            fecha_termino_str = datos.get('fecha_termino')

            if fecha_termino_str:
                fecha_termino = datetime.fromisoformat(fecha_termino_str)
                if fecha_termino <= fecha_inicio:
                    errores.append("La hora de término debe ser posterior a la de inicio.")
            else:
                fecha_termino = None
        except:
            errores.append("Fecha de inicio inválida.")


        temas = datos.getlist('temas')
        if not temas:
            errores.append("Debe seleccionar al menos un tema.")
        if 'otro' in temas:
            glosa_otro = datos.get('glosa_otro', '')
            if len(glosa_otro) < 3 or len(glosa_otro) > 15:
                errores.append("La glosa para 'otro' debe tener entre 3 y 15 caracteres.")

        fotos = request.files.getlist('fotos')
        if not fotos or len(fotos) > 5:
            errores.append("Debe subir entre 1 y 5 fotos.")

        identificadores = request.form.getlist('identificador')
        if any(len(i) < 4 or len(i) > 50 for i in identificadores):
            errores.append("Cada identificador de contacto debe tener entre 4 y 50 caracteres.")

        if errores:
            for error in errores:
                flash(error)
            return redirect(url_for('informar_actividad'))

        actividad = Actividad(
            comuna_id=datos.get('comuna'),
            sector=datos.get('sector'),
            nombre=datos.get('organizador'),
            email=datos.get('correo'),
            celular=datos.get('telefono'),
            dia_hora_inicio=fecha_inicio,
            dia_hora_termino=fecha_termino,
            descripcion=datos.get('descripcion')
        )

        db.session.add(actividad)
        db.session.commit()  # Necesario para obtener actividad.id

        # Guardar todos los temas seleccionados
        for tema in temas:
            tema_entry = ActividadTema(
                tema=tema,
                glosa_otro=glosa_otro if tema == 'otro' else None,
                actividad_id=actividad.id
            )
            db.session.add(tema_entry)

        # Guardar todos los métodos de contacto
        nombres = request.form.getlist('metodo_nombre')
        for nombre, identificador in zip(nombres, identificadores):
            contacto = ContactarPor(
                nombre=nombre,
                identificador=identificador,
                actividad_id=actividad.id
            )
            db.session.add(contacto)

        UPLOAD_FOLDER = 'static/uploads'
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        for foto in fotos:
            if foto.filename:
                filename = secure_filename(foto.filename)
                actividad_folder = os.path.join(UPLOAD_FOLDER, f"actividad_{actividad.id}")
                os.makedirs(actividad_folder, exist_ok=True)
                filepath = os.path.join(actividad_folder, filename)
                foto.save(filepath)

                nueva_foto = Foto(
                    ruta_archivo=f"uploads/actividad_{actividad.id}",
                    nombre_archivo=filename,
                    actividad_id=actividad.id
                )
                db.session.add(nueva_foto)

        db.session.commit()

        flash('Actividad registrada correctamente.')
        return redirect(url_for('index'))

    regiones = Region.query.all()
    comunas = Comuna.query.all()
    return render_template('informar-actividad.html', regiones=regiones, comunas=comunas)

@app.route('/actividades')
def ver_actividades():
    page = request.args.get('page', 1, type=int)
    actividades_pag = Actividad.query.order_by(Actividad.id.desc()).paginate(page=page, per_page=5)
    return render_template('ver-actividades.html', actividades=actividades_pag.items, pagination=actividades_pag)


@app.route('/actividad/<int:id>')
def detalle_actividad(id):
    actividad = Actividad.query.get_or_404(id)
    return render_template('detalle-actividad.html', actividad=actividad)

@app.route('/get_comunas/<int:region_id>')
def get_comunas(region_id):
    comunas = Comuna.query.filter_by(region_id=region_id).all()
    return jsonify([{'id': c.id, 'nombre': c.nombre} for c in comunas])

@app.route('/estadisticas')
def ver_estadisticas():
    total = Actividad.query.count()

    actividades_por_comuna = db.session.query(
        Comuna.nombre,
        db.func.count(Actividad.id)
    ).join(Actividad).group_by(Comuna.id).all()

    actividades_por_tema = db.session.query(
        ActividadTema.tema,
        db.func.count(ActividadTema.actividad_id)
    ).group_by(ActividadTema.tema).all()

    return render_template('estadisticas.html',
                           total=total,
                           por_comuna=actividades_por_comuna,
                           por_tema=actividades_por_tema)

@app.route('/api/actividades_por_dia')
def actividades_por_dia():
    resultados = db.session.query(
        db.func.date(Actividad.dia_hora_inicio),
        db.func.count(Actividad.id)
    ).group_by(db.func.date(Actividad.dia_hora_inicio)).all()

    return jsonify([
        {"fecha": r[0].strftime("%Y-%m-%d"), "cantidad": r[1]}
        for r in resultados
    ])

@app.route('/api/actividades_por_tema')
def actividades_por_tema():
    resultados = db.session.query(
        ActividadTema.tema,
        db.func.count(ActividadTema.actividad_id)
    ).group_by(ActividadTema.tema).all()

    return jsonify([
        {"tema": r[0], "cantidad": r[1]}
        for r in resultados
    ])

@app.route('/api/actividades_por_mes_y_periodo')
def actividades_por_mes_y_periodo():
    def clasificar_periodo(hora):
        if hora < 12:
            return "mañana"
        elif hora < 18:
            return "mediodía"
        else:
            return "tarde"

    actividades = Actividad.query.all()
    datos = {}

    for a in actividades:
        if not a.dia_hora_inicio:
            continue
        mes = a.dia_hora_inicio.strftime("%Y-%m")
        periodo = clasificar_periodo(a.dia_hora_inicio.hour)
        if mes not in datos:
            datos[mes] = {"mañana": 0, "mediodía": 0, "tarde": 0}
        datos[mes][periodo] += 1

    return jsonify(datos)

@app.route('/api/comentarios', methods=['POST'])
def agregar_comentario():
    data = request.get_json()
    nombre = data.get('nombre', '').strip()
    texto = data.get('texto', '').strip()
    actividad_id = data.get('actividad_id')

    errores = []
    if not nombre or len(nombre) < 3 or len(nombre) > 80:
        errores.append("Nombre debe tener entre 3 y 80 caracteres.")
    if not texto or len(texto) < 5:
        errores.append("El comentario debe tener al menos 5 caracteres.")

    if errores:
        return jsonify({"success": False, "errores": errores}), 400

    comentario = Comentario(
        nombre=nombre,
        texto=texto,
        fecha=datetime.now(),
        actividad_id=actividad_id
    )
    db.session.add(comentario)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/comentarios/<int:actividad_id>')
def obtener_comentarios(actividad_id):
    comentarios = Comentario.query.filter_by(actividad_id=actividad_id).order_by(Comentario.fecha.desc()).all()
    return jsonify([
        {
            "nombre": c.nombre,
            "texto": c.texto,
            "fecha": c.fecha.strftime("%Y-%m-%d %H:%M")
        }
        for c in comentarios
    ])


if __name__ == '__main__':
    app.run(debug=True)
