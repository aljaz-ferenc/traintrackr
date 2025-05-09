import { useCallback, useEffect, useState } from "react";

export default function useScreenSize() {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	const handleResize = useCallback(() => {
		console.log("resized");
		setSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return size;
}
