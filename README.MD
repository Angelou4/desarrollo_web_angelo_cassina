# Tarea 3

Este repositorio contiene los archivos correspondientes a la entrega de la Tarea 2 y 3.

## Detalles

Durante el desarrollo de esta tarea, se agregaron las siguientes líneas al archivo tarea2.sql para la generacion de la tabla actividad_tema para asegurar el correcto funcionamiento de los caracteres con tilde y otros símbolos especiales: 
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_general_ci;

Esto fue necesario para evitar errores de codificación al trabajar con campos VARCHAR que contienen tildes o acentos.

