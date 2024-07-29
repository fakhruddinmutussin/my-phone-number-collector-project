import { useEffect, useState } from 'react';
import "./App.css";
import { Button, Input } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import mockData from './test.json';

function isMobileDevice() {
	return /Mobi|Android/i.test(navigator.userAgent);
}

function App() {
	const [eventName] = useState(mockData.eventName);
	const [step, setStep] = useState(0);
	const [phone, setPhone] = useState("601");
	const [pressedKey, setPressedKey] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [places] = useState(mockData.places);
	const [selectedPlaces, setSelectedPlaces] = useState([]);
	const [windowHeight, setWindowHeight] = useState(0);
	
	useEffect(() => {
		setWindowHeight(window.innerHeight);
		window.addEventListener("resize", () => {
			setWindowHeight(window.visualViewport?.height ?? 0);
		});

		const saveCustomerDataFromLocalStorageToServer = async () => {
			const customerDataStr = localStorage.getItem("customerData") ?? "[]";
			const customerData = JSON.parse(customerDataStr);
			const unsaved = [];

			for (const data of customerData) {
				const res = await fetch(mockData.saveLeadApi, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ data }),
				});

				if (!res.ok) {
					unsaved.push(data);
				}
			}

			localStorage.setItem("customerData", JSON.stringify(unsaved));
		};

		setInterval(saveCustomerDataFromLocalStorageToServer, 10000);
	}, []);

	const resetPage = () => {
		setStep(0);
		setPhone("601");
		setName("");
		setEmail("");
		setSelectedPlaces([]);
	};

	const setNum = (num) => {
		if (pressedKey !== null) {
			return;
		}

		setPressedKey(num);
		if (phone.length < 14) {
			setPhone((oldVal) => `${oldVal}${num}`);
		}
	};

	const deleteNum = () => {
		setPhone((oldVal) => {
			if (oldVal.length < 4) {
				return "601";
			}

			return oldVal.slice(0, -1);
		});
	};

	const selectPlace = (place) => {
		if (selectedPlaces.includes(place)) {
			setSelectedPlaces((oldVal) => oldVal.filter((item) => item !== place));
		} else {
			setSelectedPlaces((oldVal) => [...oldVal, place]);
		}
	};

	const saveToLocalStorage = (customerData) => {
		const lStgStr = localStorage.getItem("customerData") ?? "[]";
		const lStg = JSON.parse(lStgStr);
		localStorage.setItem("customerData", JSON.stringify([...lStg, customerData]));
	};

	const submitLead = () => {
		saveToLocalStorage({
			eventName,
			name,
			email,
			phone,
			country: selectedPlaces,
		});
		resetPage();
	};
	if (step === 0) {
		if (isMobileDevice()) {
			return (
				<div className="fixed top-0 bottom-0 left-0 right-0 bg-[#5E114222] flex flex-col justify-center items-center gap-8">
					<div className="max-w-[414px] flex flex-col gap-8 items-center">
						<img className="h-[80px] w-[70%] object-contain" src={mockData.logo} alt="mtb" />
						<p className="bg-[#5E1142] w-[70%] text-center px-4 py-1 rounded-2xl text-white text-4xl select-none">${phone}</p>
						<div className="grid grid-cols-3 gap-2">
							<div
								className={`${pressedKey === 1 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(1)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}

							>1
							</div>
							<div
								className={`${pressedKey === 2 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(2)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>2
							</div>
							<div
								className={`${pressedKey === 3 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(3)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>3
							</div>
							<div
								className={`${pressedKey === 4 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(4)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>4
							</div>
							<div
								className={`${pressedKey === 5 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(5)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>5
							</div>
							<div
								className={`${pressedKey === 6 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(6)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>6
							</div>
							<div
								className={`${pressedKey === 7 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(7)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>7
							</div>
							<div
								className={`${pressedKey === 8 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(8)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>8
							</div>
							<div
								className={`${pressedKey === 9 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(9)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>9
							</div>
							<button
								type="primary"
								className="border-none w-full h-full rounded-2xl text-white text-3xl text-center"
								disabled={phone.length < 11}
								onClick={() => setStep((val) => val + 1)}
							>GO
							</button>
							<div
								className={`${pressedKey === 0 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onTouchStart={() => setNum(0)}
								onTouchEnd={() => setPressedKey(null)}
								onTouchCancel={() => setPressedKey(null)}
							>0
							</div>
							<div className="flex justify-center items-center" onClick={() => deleteNum()}>
								<RollbackOutlined className="text-2xl" />
							</div>

						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="fixed top-0 bottom-0 left-0 right-0 bg-[#5E114222] flex flex-col justify-center items-center gap-8">
					<div className="max-w-[414px] flex flex-col gap-8 items-center">
						<img className="h-[80px] w-[70%] object-contain" alt="mtb" src={mockData.logo} />
						<p className="bg-[#5E1142] w-[70%] text-center px-4 py-1 rounded-2xl text-white text-4xl select-none">{phone}</p>
						<div className="grid grid-cols-3 gap-2">
							<div
								className={`${pressedKey === 1 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(1)}
								onMouseUp={() => setPressedKey(null)}
							>
								1
							</div>
							<div
								className={`${pressedKey === 2 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(2)}
								onMouseUp={() => setPressedKey(null)}
							>
								2
							</div>
							<div
								className={`${pressedKey === 3 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(3)}
								onMouseUp={() => setPressedKey(null)}
							>
								3
							</div>
							<div
								className={`${pressedKey === 4 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(4)}
								onMouseUp={() => setPressedKey(null)}
							>
								4
							</div>
							<div
								className={`${pressedKey === 5 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(5)}
								onMouseUp={() => setPressedKey(null)}
							>
								5
							</div>
							<div
								className={`${pressedKey === 6 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(6)}
								onMouseUp={() => setPressedKey(null)}
							>
								6
							</div>
							<div
								className={`${pressedKey === 7 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(7)}
								onMouseUp={() => setPressedKey(null)}
							>
								7
							</div>
							<div
								className={`${pressedKey === 8 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(8)}
								onMouseUp={() => setPressedKey(null)}
							>
								8
							</div>
							<div
								className={`${pressedKey === 9 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(9)}
								onMouseUp={() => setPressedKey(null)}
							>
								9
							</div>
							<Button
								type="primary"
								className="border-none w-full h-full rounded-2xl text-white text-3xl text-center"
								disabled={phone.length < 11}
								onClick={() => setStep((val) => val + 1)}
							>
								GO
							</Button>
							<div
								className={`${pressedKey === 0 ? "bg-[#5E1142]" : "bg-[#5E114299]"
									} py-5 px-5 rounded-2xl text-white text-3xl text-center select-none`}
								onMouseDown={() => setNum(0)}
								onMouseUp={() => setPressedKey(null)}
							>
								0
							</div>
							<div className="flex justify-center items-center" onClick={() => deleteNum()}>
								<RollbackOutlined className="text-2xl" />
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	if (step === 1) {
		return (
			<div className="fixed top-0 bottom-0 left-0 right-0 bg-[#5E114222] flex flex-col justify-center items-center">
				<div className="max-w-[414px] flex flex-col gap-8 items-center">
					<img className="h-[80px] w-[70%] object-contain" alt="mtb" src={mockData.logo} />
					<p
						className="bg-[#5E1142] w-[70%] text-center px-4 py-1 rounded-2xl text-white text-4xl select-none hover:cursor-pointer"
						onClick={() => setStep(0)}
					>
						{phone}
					</p>
					<div className="max-h-[80%] w-[70%] flex justify-center items-center flex-wrap gap-3 my-8">
						{places.map((item) => (
							<div
								key={item}
								className={`text-white h-fit text-2xl py-1 px-4 rounded-2xl hover:cursor-pointer ${selectedPlaces.includes(item) ? "bg-[#5E1142]" : "bg-[#5E114299]"
									}`}
								onClick={() => selectPlace(item)}
							>
								{item}
							</div>
						))}
					</div>
					{selectedPlaces.length > 0 && (
						<Button
							type="primary"
							className="text-white h-fit w-[70%] text-2xl rounded-2xl"
							disabled={phone.length < 11}
							onClick={() => setStep((val) => val + 1)}
						>
							GO
						</Button>
					)}
				</div>
			</div>
		);
	}

	if (step === 2) {
		return (
			<div
				className="fixed top-0 left-0 w-full bg-[#5E114222] flex flex-col justify-center items-center gap-8"
				style={{ height: windowHeight }}
			>
				<div className="max-w-[414px] flex flex-col gap-8 items-center">
					<img className="h-[80px] w-[70%] object-contain" alt="mtb" src={mockData.logo} />
					<p
						className="bg-[#5E1142] w-[70%] text-center px-4 py-1 rounded-2xl text-white text-4xl select-none hover:cursor-pointer"
						onClick={() => setStep(0)}
					>
						{phone}
					</p>
					<div className="w-[70%] max-h-[80%] flex justify-center items-center flex-wrap gap-3">
						<Input className="py-2 text-2xl" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
						<Input
							type="email"
							className="py-2 text-2xl"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					{name && email && (
						<Button type="primary" className="text-white h-fit w-[70%] text-2xl rounded-2xl" onClick={() => submitLead()}>
							Submit
						</Button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 bg-[#5E114222] flex flex-col justify-center items-center gap-8">
			<div className="max-w-[414px] flex flex-col gap-8 items-center">
				<img className="h-[80px] w-[70%] object-contain" alt="mtb" src={mockData.logo} />
			</div>
		</div>
	);
}
export default App;
