import { Logo } from '@/components/Logo';
import NavMenu from '@/components/NavMenu';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
	return (
		<>
			<header className='bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 py-4 shadow-lg'>
				<div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6'>
					{/* Logo */}
					<div className='w-28'>
						<Logo />
					</div>
					<div className='pr-28'>
						<NavMenu />
					</div>
				</div>
			</header>

			<section className='max-w-screen-2xl mx-auto mt-10 p-5'>
				<Outlet />
			</section>

			<footer className='py-5'>
				<p className='text-center'>
					Todos los derechos reservados &copy; {new Date().getFullYear()}
				</p>
			</footer>
		</>
	);
};
