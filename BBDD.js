var conn = new Mongo('localhost:27017');
db = conn.getDB("AlKaTiendaInformatica");
db.productos.insertMany([
	{
		codigo:01,
		nombre:"Gigabyte GA-H81M-S2H",
		descripcion:"Un conjunto de características y de componentes que proporcionan un rendimiento récord, un funcionamiento eficiente a temperaturas bajas y una mayor vida útil de la placa.",
		precio:50.05,
		valoracion:0,
		tipo:"placa base",
		foto:"http://www.gigabyte.com/fileupload/product/2/5158/11077_big.jpg"
	},
	{
		codigo:02,
		nombre:"MSI H81M-E33",
		descripcion:"Te presentamos  la H81M-E33 de MSI, una placa base con socket Intel 1150.",
		precio:43.20,
		valoracion:0,
		tipo:"placa base",
		foto:"https://asset.msi.com/resize/image/global/product/five_pictures1_2902_20140407165936.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png"
	}
]);