# La Biblioteca Perdida

![La-Biblioteca-Perdida](http://2.bp.blogspot.com/-ijtLiMaAAnQ/Uftuj_SBTVI/AAAAAAAAAOI/pGnFDTfX5SY/s1600/Logo%2BLBP.jpg)

Aplicación de escritorio (Linux, Windows i MacOS) para escuchar y guardar los audios de [La Biblioteca Perdida](http://www.labibliotecaperdida.info).

## Hecho con

* [Electron-Vue](https://github.com/SimulatedGREG/electron-vue)
* [Yarn](https://yarnpkg.com/lang/en/)
* [Electron-builder](https://www.electron.build/)

## Como descargar la aplicación

Para poder descargar y usar la aplicación en vuestros ordenadores solamente tenéis que ir a la sección de [Releases](https://github.com/mateullull/la-biblioteca-perdida/releases) que está en el menú superior y una vez dentro, descargar la aplicación correspondiente para vuestro sistema operativo, siempre seleccionando la última versión disponible (está marcada con el “tag” `latest release`)

### Problemas conocidos al ejecutar la aplicación sobre MacOS

Jesus Fernandez me hizo saber que en las versiones Sierra y High Sierra hay una protección que impide instalar aplicaciones no firmadas por Apple. Desgraciadamente yo no cuento con ningún sistema de Apple y por tanto no puedo generar aplicaciones para dicho sistema. Por lo tanto, para poder instalar la aplicación sobre estos sistemas operativos hay que realizar lo siguiente:

1. Lo primero que debemos hacer es abrir una ventana de Terminal (está ubicado en Aplicaciones – Utilidades, aunque también podemos acceder desde Spotligh).


2. En la ventana que se abre tecleamos el siguiente comando: `sudo spctl --master-disable`


3. Nos solicitará la contraseña para confirmar el cambio. La introducimos y presionamos la tecla Enter (al escribir la contraseña no veremos aparecer los caracteres y tampoco asteriscos. Terminal no los muestra por motivos de seguridad, pero sí la está registrando).

Y listo. Tras realizar estos tres pasos, si vamos a *Preferencias del sistema – Seguridad y privacidad* podremos ver como la opción *Cualquier sitio* (o *Anywhere* en caso de tener el sistema operativo en inglés) estará marcada. Esto nos permitirá instalar la aplicación correctamente.


## ¿Puedo contribuir al proyecto?

Evidentemente! Lamentablemente mis habilidades en cuanto a diseño gráfico son muy limitadas, sería de agradecer si pudiéramos mejorar este aspecto (no solo en diseño de iconos o imágenes para la App, sino también en cuanto a su estructura y presentación de la información). Obviamente las mejoras a nivel de código también son bienvenidas.

Si tienes alguna duda o sugerencia, puedes comentarlo en el [grupo de Telegram](https://t.me/joinchat/AAAAAEINIyZZyAB6ni7ZxA) de La Biblioteca Perdida o enviarme directamente un mensaje de Telegram.

Si estás interesado en contribuir al proyecto, en las siguientes líneas te explico como hacerlo.


## Contribuyendo al proyecto

```
[EN CONSTRUCCIÓN]
```

## Autores

* **Mateu Llull** - *Proyecto inicial* - [MateuLlull](https://github.com/MateuLlull)


## Agradecimientos

* A todo el equipo de [La biblioteca perdida](http://labibliotecaperdida.blogspot.com.es/)


## FAQ


**Si dono dinero a través de la aplicación, ¿quién es el receptor?**

Si usas el botón _donar_ de la aplicación, el receptor del donativo es _La Biblioteca Perdida_, es el mismo botón que aparece en Ivoox cuando donas dinero.



## Licencia

Este proyecto se distribuye bajo licencia MIT, puedes ver más detalles en el archivo [LICENSE.md](LICENSE.md).