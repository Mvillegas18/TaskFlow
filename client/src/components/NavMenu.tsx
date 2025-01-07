import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function NavMenu() {
	return (
		<Popover className='relative'>
			{/* Botón de hamburguesa */}
			<Popover.Button className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 shadow-lg'>
				<Bars3Icon className='w-6 h-6 text-white' />
			</Popover.Button>

			{/* Panel desplegable */}
			<Transition
				as={Fragment}
				enter='transition ease-out duration-300'
				enterFrom='opacity-0 translate-y-1'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-in duration-200'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-1'>
				<Popover.Panel className='absolute left-1/2 z-10 mt-3 w-64 -translate-x-1/2 rounded-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 shadow-xl ring-1 ring-gray-900/10'>
					<p className='text-center text-white font-medium mb-4'>
						Hola, Usuario
					</p>
					<Link
						to='/profile'
						className='block px-4 py-2 text-white rounded-md hover:bg-blue-500 hover:text-white transition-colors'>
						Mi Perfil
					</Link>
					<Link
						to='/'
						className='block px-4 py-2 text-white rounded-md hover:bg-blue-500 hover:text-white transition-colors'>
						Mis Proyectos
					</Link>
					<button
						className='block w-full px-4 py-2 text-left text-white rounded-md hover:bg-blue-500 hover:text-white transition-colors'
						type='button'
						onClick={() => {}}>
						Cerrar Sesión
					</button>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}
