import { SignOutButton } from '@clerk/clerk-react';
import Overlay from './overlay';

export default function Modal({ closeModal }) {
	const handleClick = (event) => {
		const active = document.querySelector('.active');
		if (active) {
			active.classList.remove('active');
		}
		event.target.classList.add('active');
	};
	return (
		<Overlay closeModal={closeModal}>
			<div
				className="bg-white flex rounded-md w-[50rem] h-[30rem] shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="w-1/3  h-full flex flex-col justify-between bg-[#f1f1f1] p-4">
					<h2 className="font-bold text-messageColor my-4">Settings</h2>
					<div className=" h-2/6 flex flex-col justify-around bg-[#f1f1f1]">
						<h3
							onClick={handleClick}
							className=" p-2 cursor-pointer transition-colors"
						>
							Account
						</h3>
						<h3
							onClick={handleClick}
							className=" p-2 cursor-pointer transition-colors"
						>
							Notifications
						</h3>
						<h3
							onClick={handleClick}
							className=" p-2 cursor-pointer transition-colors"
						>
							Connected Accounts
						</h3>
					</div>
					<h3
						className="p-2 cursor-pointer transition-colors mb-5 "
						onClick={closeModal}
					>
						<SignOutButton />
					</h3>
				</div>
				<div className="w-2/3 m-2">
					<a
						href="#"
						onClick={closeModal}
						className="relative top-3 left-[31rem]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							width="24"
							height="24"
						>
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
						</svg>
					</a>
					<h2>Account</h2>
				</div>
			</div>
		</Overlay>
	);
}
