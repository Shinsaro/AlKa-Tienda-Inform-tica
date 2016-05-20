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
		marca: ObjectId("573dd4e62e790d27110b747d"),
		valoracion:[],
		tipo:"placa base",
		foto:"/images/fotosProductos/gigabyte_h81m_s2h"
	},
	{
		nombre:"MSI H81M-E33",
		descripcion:"Te presentamos  la H81M-E33 de MSI, una placa base con socket Intel 1150.",
		precio:43.20,
		marca: ObjectId("573dd4ec2e790d27110b747e"),
		valoracion:[],
		tipo:"placa base",
		foto:"/images/fotosProductos/msi_h81m_e33-compressor.jpg",
        caracteristicas:[
            "Supports 4th Gen Intel® Core™ / Pentium® / Celeron® processors for LGA 1150 socket",
            "Supports DDR3-1600 Memory",
            "USB 3.0 + SATA 6Gb/s",
            "Military Class 4: Top Quality & Stability",
            "Military Class Essentials: Total Protection for Military Class Motherboards",
            "OC Genie 4: Overclock in 1 Second",
            "Click BIOS 4: Easily Fine-tune Your System",
            "4K UHD Support: Ultra-high Definition Visual Experience",
            "Command Center: Control & Customize Your PC Settings",
            "Fast Boot: Quickly Boot Up & Enter OS in A Few Seconds",
            "M-Flash: Simply Update & Backup Your BIOS",
            "Live Update 5: Easily Update The Latest BIOS & Drivers"
        ],
        especificaciones:[
            {
                nombre: "CPU",
                caracteristicas: [
                    "4th Generation Intel® Core™ i7 / Core™ i5 / Core™ i3 / Pentium® / Celeron® processors for LGA 1150 socket",
                    "Please refer to CPU Support for compatible CPU; the above description is for reference only."
                ]
            },
            {
                nombre: "Chipset",
                caracteristicas: [
                    "Support two DDR3 DIMMs 1066/1333/1600 MHz, up to 16GB Max",
                ]
            },
            {
                nombre: "Main Memory",
                caracteristicas: [
                    "1 x PCIe 2.0 x16 slot",
                    "1 x PCIe x1 slot"
                ]
            },
            {
                nombre: "On-Board SATA ",
                caracteristicas: [
                    "SATAIII controller integrated in Intel® H81 chipset",
                    "Up to 6Gb/s transfer speed.",
                    "Supports two SATAIII ports (SATA1~2) by H81",
                    "SATAII controller integrated in Intel® H81 chipset",
                    "Up to 3Gb/s transfer speed.",
                    "Supports two SATAII ports (SATA3~4) by H81"
                ]
            },
            {
                nombre: "USB 3.0",
                caracteristicas: [
                    "2 x USB 3.0 ports on the back panel (rear x 2)"
                ]
            },
            {
                nombre: "Audio",
                caracteristicas: [
                    "Chip integrated by Realtek® ALC887",
                    "Flexible 8-channel audio with jack sensing",
                    "Compliant with Azalia 1.0 spec"
                ]
            },
            {
                nombre: "LAN",
                caracteristicas: [
                    "Supports Gb LAN 10/100/1000 by Realtek® RTL8111G"
                ]
            },
            {
                nombre: "Internal I/O Connectors ",
                caracteristicas: [
                    "1 x ATX 24-Pin power connector",
                    "1 x 4-pin ATX 12V power connector",
                    "CPU x 1 / System x 2 FAN connectors",
                    "1 x Clear CMOS jumper",
                    "2 x SATAIII connectors",
                    "2 x SATAII connectors",
                    "2 x USB 2.0 connectors",
                    "1 x Serial port connector",
                    "1 x Trusted Platform Module (TPM) header",
                    "1 x Front Panel Audio connector",
                    "1 x Chassis Intrusion connector"
                ]
            },
            {
                nombre: "Back Panel I/O Ports",
                caracteristicas: [
                    "1 x PS/2 keyboard port",
                    "1 x PS/2 mouse port",
                    "4 x USB 2.0 ports",
                    "2 x USB 3.0 ports",
                    "1 x RJ45 LAN Jack",
                    "1 x 3 in 1 audio jack",
                    "1 x Graphic Card port",
                    "1 x HDMI port"
                ]
            },
            {
                nombre: "BIOS",
                caracteristicas: [
                    "The motherboard BIOS provides 'Plug & Play' BIOS which detects the peripheral devices and expansion cards of the board automatically.",
                    "The motherboard provides a Desktop Management Interface(DMI) function which records your motherboard specifications."
                ]
            },
            {
                nombre: "Dimension",
                caracteristicas: [
                    "22.6cm(L) x 17.3cm(W) Micro-ATX Form Factor"
                ]
            },
            {
                nombre: "Mounting",
                caracteristicas: [
                    "6 mounting holes"
                ]
            }
        ]
	},
	{
		nombre:"MSI 970 Gaming",
		descripcion:"Placas base MSI GAMING ® están diseñados para proporcionar a los jugadores con las características y la mejor tecnología en su clase. Con el respaldo de las miradas imponentes de dragón de MSI, cada placa base es una obra maestra de la ingeniería a la medida de la perfección de juego.",
		precio:96,
		marca: ObjectId("573dd4ec2e790d27110b747e"),
		valoracion:[],
		tipo:"placa base",
		foto:"/images/fotosProductos/msi_970_gaming"
	},
	{
		nombre:"Asus H61M-K",
		descripcion:"La placa micro-ATX H61 más rentable con UEFI BIOS.",
		precio:48,
		marca: ObjectId("573dd4d92e790d27110b747b"),
		valoracion:[],
		tipo:"placa base",
		foto:"/images/fotosProductos/asus_h61m_k-compressor"
	},
	{
		nombre:"Intel Core i5-6500 3.2Ghz Box",
		descripcion:"Te presentamos en AlKaTiendaInformatica el Intel Core i5-6500, lo último de Intel, un procesador con Socket 1151.",
		precio:192,
		marca: ObjectId("573dd4f22e790d27110b747f"),
		valoracion:[],
		tipo:"procesadores",
		foto:"/images/fotosProductos/intel_core_i5_6500_3_2ghz_box-compressor"
	},
	{
		nombre:"Intel i7-6700K 4.0Ghz Box",
		descripcion:"La nueva hornada de procesadores Intel estrena socket o zócalo, pasando de los 1150 pines de la generación Haswell a los 1151 de este i7 6700K de la generación Skylake.",
		precio:329,
		marca: ObjectId("573dd4f22e790d27110b747f"),
		valoracion:[],
		tipo:"procesadores",
		foto:"/images/fotosProductos/intel_i7_6700k_4_0ghz_box-compressor"
	}
]);
