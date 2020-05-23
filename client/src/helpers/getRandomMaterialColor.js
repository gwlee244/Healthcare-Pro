export default function getRandomMaterialColor() {
	const colors = [
		"red",
		"pink",
		"purple",
		"deepPurple",
		"indigo",
		"blue",
		"lightBlue",
		"cyan",
		"teal",
		"green",
		"lightGreen",
		"lime",
		"yellow",
		"amber",
		"orange",
		"deepOrange"
	];
	return colors[Math.floor(Math.random() * 16)];
}
