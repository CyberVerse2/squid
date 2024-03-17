import { Fragment, useRef } from 'react';
import { readFileAsDataURL } from '../../utils/readFileUrl';

export function MessageInput({ setNewMessage, newMessage, handleSubmit }) {
	const fileRef = useRef(null);


	const handleAddFileClick = () => {
		fileRef.current?.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			const imgeSrc = await readFileAsDataURL(file);
			setNewMessage(prev => {return {...prev, imageSrc: imgeSrc}});
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="relative px-3 py-2 flex items-end justify-between max-h-[4rem] h-screen"
		>
			<input
				type="file"
				ref={fileRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
			<button
				onClick={handleAddFileClick}
				type="button"
				href="#"
				className="p-2"
			>
				<img src="/icons/clip.svg" alt="clip" />
			</button>
			<div className="flex items-center rounded-md border-2 border-gray-200 w-[93%]">
				<input
					required
					type="text"
					className="w-full px-3 py-2  rounded-md focus:outline-none text-sm max-h-11 resize-none overflow-auto"
					rows={1}
					value={newMessage.text}
					onChange={(e) => setNewMessage(prev => { return {...prev, text: e.target.value} })}
					placeholder="Type a message" 
				></input>
				{newMessage.imageSrc && (
					<Fragment>
						<div className="h-16 rounded-md w-[7rem] absolute bottom-full">
							<img
								className="w-4 h-4 invert brightness-200 absolute top-2 right-2"
								src="/icons/cancel.svg"
								alt=""
                onClick={()=>setNewMessage(prev => { return {...prev, imageSrc: ""} })}
							/>{' '}
							<img
								className="h-full rounded-md w-full  object-cover"
								src={newMessage.imageSrc}
								alt=""
							/>
						</div>{' '}
					</Fragment>
				)}
				<button className="ml-2  text-white px-3 py-2 ">
					<img src="/icons/send.svg" alt="" />
				</button>
			</div>
		</form>
	);
}
