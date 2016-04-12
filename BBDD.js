var conn = new Mongo('localhost:27017');
db = conn.getDB("AlKaTiendaInformatica");
db.productos.insertMany({
	{codigo:01,nombre:"Gigabyte GA-H81M-S2H - Placa Base",descripcion:"Prueba",tipo:"placa base",foto:"ex01.png"},
	{codigo:02,nombre:"Gigabyte GA-H69M-S1H - Placa Base",descripcion:"Prueba 2",tipo:"placa base",foto:"ex02.png"}
});