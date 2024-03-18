import { useUser } from '@clerk/clerk-react';

export function Sidebar({ openModal }) {
	const { user } = useUser();

	return (
		<div className="w-20 flex flex-col justify-start items-center max-h-[100vh] border border-gray-200 py-4">
			<img
				src={user.imageUrl}
				alt="User profile"
				className="w-9 h-9 object-cover rounded-md"
			/>
				<div className="flex flex-1 flex-col h-20 pt-14 gap-8">
					<img src="/icons/home.svg" alt="" />
					<img src="/icons/add-issue.svg" alt="" />
					<img src="/icons/repo.svg" alt="" />
				</div>
			<div  className='' onClick={openModal}>
	<img src="/icons/settings.svg" alt="" />
			</div>
		</div>
	);
}
