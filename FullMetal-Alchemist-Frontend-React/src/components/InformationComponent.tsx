
function InformationComponent() {

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-200 to-slate-800 px-4 pt-6 space-y-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="flex flex-col space-y-6">
                <div className="w-full h-full flex flex-col bg-white/50 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-6">
                    <h3 className="font-bold text-center text-black-400">El Mundo De FullMetal-Alchemist</h3>
                        <p className="text-justify text-red-800 font-bold" >Fullmetal Alchemist: Brotherhood es una historia ambientada en el país ficticio de Amestris, una nación militarizada 
                           en la que la alquimia es una ciencia reconocida ampliamente practicada. La alquimia se basa en el principio del intercambio 
                           equivalente: para obtener algo, se debe ofrecer algo de igual valor. Esta ley natural regula todo el funcionamiento del mundo 
                           y representa el núcleo filosófico de la serie, además, la serie muestra una gran enseñanza en cuestiones del conocimiento y 
                           el poder, demostrando que es importante tener consciencia de lo que se controla y conoce de una forma practica para poder 
                           percibir el mundo desde un punto de vista analítico y favorable en vez de apocalíptico y destructivo. En general, 
                           FullMetal Alchemist: Brotherhood es una historia llena de acción y reflexiones que dejan una huella en cualquier persona.</p>
                </div>
                <div className="w-full h-full flex flex-col bg-white/50 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-6">
                    <h3 className="font-bold text-center text-black-400">¡La Aplicacion Para Alquimistas!</h3>
                        <p className="text-justify text-red-800 font-bold">Con base a la serie previamente mencionada, se ha realizado esta aplicación para las acciones y operaciones de los alquimistas 
                           estatales relacionados a esta serie, aquí podrás encontrar distintas opciones para controlar y supervisar distintos elementos 
                           relacionados con los alquimistas.</p>
                </div>
            </div>
            <div className="w-full h-full flex-1 bg-white/50 backdrop-blur-md shadow-lg rounded-lg p-6 space-y-6">
                <img src="https://geemerch.com/cdn/shop/products/5363.jpg?v=1744928139" alt="Imagen De FullMetal-Alchemist: Brotherhood" className="w-full h-full object-cover border border-slate-600 shadow-sm" />
            </div>
        </div>
    </div>
  );
}

export { InformationComponent };
