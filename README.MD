# Tarea 3

Este repositorio contiene los archivos correspondientes a la entrega de la Tarea 2 y 3.

## Detalles

Durante el desarrollo de esta tarea, se agregaron las siguientes líneas al archivo tarea2.sql para la generacion de la tabla actividad_tema para asegurar el correcto funcionamiento de los caracteres con tilde y otros símbolos especiales: 
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_general_ci;

Esto fue necesario para evitar errores de codificación al trabajar con campos VARCHAR que contienen tildes o acentos.


Validacion de HTML y CSS:

Debido a que este proyecto utiliza plantillas Jinja2 (sintaxis como {{ variable }} y {% for ... %}), los archivos .html originales no son directamente válidos según el validador HTML W3C.

Sin embargo, los archivos HTML generados por Flask al ejecutar la aplicación fueron validados correctamente. Para ello:

Se ejecutó la aplicación localmente con Flask.

Se accedió a cada vista en el navegador (como /, /actividades, /actividad/<id>, etc.).

Se utilizó la opción “Ver código fuente de la página”.

El HTML generado se copió y validó en validator.w3.org.

Esto asegura que el HTML real que ve el usuario cumple completamente con los estándares.