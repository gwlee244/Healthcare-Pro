// data template for apex charts
module.exports = {
	quantity: {
		series: [100],
		options: {
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 15,
						size: "70%"
					},
					dataLabels: {
						showOn: "always",
						name: {
							offsetY: 15,
							show: true,
							color: "#10ec6c",
							fontSize: "3em"
						},
						value: {
							color: "#111",
							fontSize: "30px",
							show: false
						}
					}
				}
			},
			fill: {
				colors: ["#10ec6c"]
			},
			stroke: {
				lineCap: "round"
			},
			labels: ["154"]
		}
	},
	sexesPie: {
		options: { labels: ["Men", "Women"], colors: ["#0059ff", "#ff00bf"] },
		series: [45, 55]
	},
	sexesBar: {
		options: {
			dataLabels: {
				enabled: false
			},
			colors: ["#0059ff", "#ff00bf"],
			stroke: {
				width: [5, 5]
			},
			plotOptions: {
				bar: {
					columnWidth: "70%"
				}
			},
			xaxis: {
				categories: [
					"0-5",
					"5-10",
					"10-16",
					"16-20",
					"20-25",
					"25-30",
					"35-40",
					"40-50",
					"50-60",
					"60-70",
					"70+"
				]
			},
			yaxis: [
				{
					axisTicks: {
						show: true
					},
					labels: {
						style: {
							color: "#FF1654",
							fontSize: "15px"
						}
					},
					title: {
						text: "Quantity",
						style: {
							fontSize: "15px"
						}
					}
				}
			],
			tooltip: {
				shared: false,
				intersect: true,
				x: {
					show: true
				}
			},
			legend: {
				horizontalAlign: "left",
				position: "top",
				offsetX: 40
			}
		},
		series: [
			{
				name: "Men",
				data: [13, 15, 10, 25, 27, 30, 26, 25, 34, 40]
			},
			{
				name: "Women",
				data: [10, 13, 12, 25, 30, 35, 50, 44, 40, 39]
			}
		]
	},
	// business: {
	// 	options: {
	// 		dataLabels: {
	// 			enabled: false
	// 		},
	// 		colors: ["#161aff"],
	// 		stroke: {
	// 			width: [10]
	// 		},
	// 		plotOptions: {
	// 			bar: {
	// 				columnWidth: "20%"
	// 			}
	// 		},
	// 		xaxis: {
	// 			categories: [
	// 				"Monday",
	// 				"Tuesday",
	// 				"Wednesday",
	// 				"Thursday",
	// 				"Friday"
	// 			]
	// 		},
	// 		yaxis: [
	// 			{
	// 				axisTicks: {
	// 					show: true
	// 				},
	// 				labels: {
	// 					style: {
	// 						color: "#FF1654",
	// 						fontSize: "1em"
	// 					}
	// 				},
	// 				title: {
	// 					text: "Visits",
	// 					style: {
	// 						fontSize: "15px"
	// 					}
	// 				}
	// 			}
	// 		],
	// 		tooltip: {
	// 			shared: false,
	// 			intersect: true,
	// 			x: {
	// 				show: true
	// 			}
	// 		}
	// 	},
	// 	series: [
	// 		{
	// 			name: "Visits",
	// 			data: [13, 15, 10, 25, 27]
	// 		}
	// 	]
	// },
	satisfaction: {
		options: {
			labels: [
				"Very satisfied",
				"Satisfied",
				"Neutral",
				"Unsatisfied",
				"Very unsatisfied"
			],
			colors: ["#1de21d", "#90d635", "#ffff00", "#ffa500", "#f00b25"]
		},
		series: [45, 55, 30, 20, 9]
	},
	monthlyVisitors: {
		series: [100],
		options: {
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 15,
						size: "60%"
					},
					dataLabels: {
						showOn: "always",
						name: {
							offsetY: 15,
							show: true,
							color: "#ffa500",
							fontSize: "3em"
						},
						value: {
							color: "#111",
							fontSize: "30px",
							show: false
						}
					}
				}
			},
			fill: {
				colors: ["#ffa500"]
			},
			stroke: {
				lineCap: "round"
			},
			labels: ["322"]
		}
	}
};