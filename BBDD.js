var conn = new Mongo('localhost:27017');
db = conn.getDB("AlKaTiendaInformatica");
db.usuarios.insert(
	{
		admin: true,
		alias: "Admin",
		contrasena: "$2a$04$xw96EoUGk93TBBjAmMtFoumYIJ4u4j7leaZo6UDtULP1uiW3i6UIi",
		correo: "admin@gmail.com"
	}
);
db.productos.insertMany([
	{
		nombre:"Gigabyte GA-H81M-S2H",
		descripcion:"Un conjunto de características y de componentes que proporcionan un rendimiento récord, un funcionamiento eficiente a temperaturas bajas y una mayor vida útil de la placa.",
		precio:50.05,
		marca: ObjectId("573a500b66075db17a1de444"),
		valoracion:0,
		tipo:"placa base",
		foto:"/images/fotosProductos/gigabyte_h81m_s2h"
	},
	{
		nombre:"MSI H81M-E33",
		descripcion:"Te presentamos  la H81M-E33 de MSI, una placa base con socket Intel 1150.",
		precio:43.20,
		marca: ObjectId("573a501066075db17a1de446"),
		valoracion:0,
		tipo:"placa base",
		foto:"/images/fotosProductos/msi_h81m_e33-compressor.jpg"
	},
	{
		nombre:"MSI 970 Gaming",
		descripcion:"Placas base MSI GAMING ® están diseñados para proporcionar a los jugadores con las características y la mejor tecnología en su clase. Con el respaldo de las miradas imponentes de dragón de MSI, cada placa base es una obra maestra de la ingeniería a la medida de la perfección de juego.",
		precio:96,
		marca: ObjectId("573a501066075db17a1de446"),
		valoracion:0,
		tipo:"placa base",
		foto:"/images/fotosProductos/msi_970_gaming"
	},
	{
		nombre:"Asus H61M-K",
		descripcion:"La placa micro-ATX H61 más rentable con UEFI BIOS.",
		precio:48,
		marca: ObjectId("573a500866075db17a1de443"),
		valoracion:0,
		tipo:"placa base",
		foto:"/images/fotosProductos/asus_h61m_k-compressor"
	},
	{
		nombre:"Intel Core i5-6500 3.2Ghz Box",
		descripcion:"Te presentamos en AlKaTiendaInformatica el Intel Core i5-6500, lo último de Intel, un procesador con Socket 1151.",
		precio:192,
		marca: ObjectId("573a500d66075db17a1de445"),
		valoracion:0,
		tipo:"procesadores",
		foto:"/images/fotosProductos/intel_core_i5_6500_3_2ghz_box-compressor"
	},
	{
		nombre:"Intel i7-6700K 4.0Ghz Box",
		descripcion:"La nueva hornada de procesadores Intel estrena socket o zócalo, pasando de los 1150 pines de la generación Haswell a los 1151 de este i7 6700K de la generación Skylake.",
		precio:329,
		marca: ObjectId("573a500d66075db17a1de445"),
		valoracion:0,
		tipo:"procesadores",
		foto:"/images/fotosProductos/intel_i7_6700k_4_0ghz_box-compressor"
	}
]);