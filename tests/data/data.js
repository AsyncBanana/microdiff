export const original = {
	IdAuto: 101,
	Marca: "Toyota",
	Modelo: "Corolla",
	Año: 2020,
	Color: "Rojo",
	Precio: 250000,
	EnStock: 1,
	DatosAuto: [
		{
			IdDatosAuto: 1,
			IdAuto: 101,
			NumeroSerie: "ABC123XYZ456",
			Kilometraje: 15000,
			Transmision: "Manual",
			Motor: {
				Tipo: "Gasolina",
				Cilindros: 4,
				Potencia: "140 HP",
			},
			Equipamiento: [
				{ IdEquipamiento: 1, Nombre: "Aire Acondicionado" },
				{ IdEquipamiento: 2, Nombre: "Bluetooth" },
				{ IdEquipamiento: 3, Nombre: "Rines de Aluminio" },
			],
			Ubicacion: {
				Sucursal: "Centro",
				Ciudad: "Ciudad de México",
				CodigoPostal: "06000",
			},
		},
	],
};

export const editado = {
	IdAuto: 101,
	Marca: "Toyota",
	Modelo: "Corolla",
	Año: 2020,
	Color: "Azul",
	Precio: 245000,
	EnStock: 1,
	DatosAuto: [
		{
			IdDatosAuto: 1,
			IdAuto: 101,
			NumeroSerie: "ABC123XYZ456",
			Kilometraje: 18000,
			Transmision: "Automática",
			Motor: {
				Tipo: "Gasolina",
				Cilindros: 4,
				Potencia: "150 HP",
			},
			Equipamiento: [
				{ IdEquipamiento: 1, Nombre: "Aire Acondicionado" },
				{ IdEquipamiento: 4, Nombre: "Cámara de Reversa" },
			],
			Ubicacion: {
				Sucursal: "Norte",
				Ciudad: "Guadalajara",
				CodigoPostal: "44100",
			},
		},
	],
};
