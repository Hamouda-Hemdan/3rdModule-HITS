/*
    Sources:
    https://developer.apple.com/documentation/gameplaykit/gkdecisiontree?language=objc#1965709
    https://kindsonthegenius.com/blog/how-to-build-a-decision-tree-for-classification-step-by-step-procedure-using-entropy-and-gain/
    https://towardsdatascience.com/entropy-how-decision-trees-make-decisions-2946b9c18c8
    */
    function getData(number) {
        let data = [];
        data[0] = [
            ["outlook",     "temperature",  "humidity",     "windy",    "play"  ],
            ["overcast",    "hot",          "high",         "FALSE",    "yes"   ],
            ["overcast",    "cool",         "normal",       "TRUE",     "yes"   ],
            ["overcast",    "mild",         "high",         "TRUE",     "yes"   ],
            ["overcast",    "hot",          "normal",       "FALSE",    "yes"   ],
            ["rainy",       "mild",         "high",         "FALSE",    "yes"   ],
            ["rainy",       "cool",         "normal",       "FALSE",    "yes"   ],
            ["rainy",       "cool",         "normal",       "TRUE",     "no"    ],
            ["rainy",       "mild",         "normal",       "FALSE",    "yes"   ],
            ["rainy",       "mild",         "high",         "TRUE",     "no"    ],
            ["sunny",       "hot",          "high",         "FALSE",    "no"    ],
            ["sunny",       "hot",          "high",         "TRUE",     "no"    ],
            ["sunny",       "mild",         "high",         "FALSE",    "no"    ],
            ["sunny",       "cool",         "normal",       "FALSE",    "yes"   ],
            ["sunny",       "mild",         "normal",       "TRUE",     "yes"   ]
        ];
        
        data[1] = [
            ["Rival",       "Play",         "Liders",       "Rain",    "Victory"    ],
            ["High",        "Home",         "Stay",          "Yes",      "No"       ],
            ["High",        "Home",         "Stay",          "No",       "Yes"      ],
            ["High",        "Home",         "Skip",          "No",       "No"       ],
            ["Low",         "Home",         "Skip",          "No",       "Yes"      ],
            ["Low",        "Visitant",      "Skip",          "No",       "No"       ],
            ["Low",         "Home",         "Skip",          "Yes",      "Yes"      ],
            ["High",        "Visitant",     "Stay",          "Yes",      "No"       ],
            ["Low",        "Visitant",      "Stay",           "No",      "Yes"      ]
        ];
      
//         data[2] = [
//           ["Type",        "HP",        "Special",     "Action"         ],
//           ["Electric",    "10",          "Yes",       "Psychic Strike" ],
//           ["Electric",    "30",           "No",        "Pound"         ],
//           ["Electric",    "40",           "Yes",       "Barrier"       ],
//           ["Fire",        "10",           "Yes",       "Pound"         ],
//           ["Fire",        "30",           "No",        "Tackle"        ],
//           ["Water",       "10",           "No",        "Pound"         ],
//           ["Water",       "40",           "No",        "Tackle"        ]
//       ];
        
//         data[3] = [
//             ["Pronostico",   "Temperatura",    "Humedad",    "Viento",    "Actividad"     ],
//             ["Soleado",        "Calido",        "Alta",       "No",      "No jugar"       ],
//             ["Soleado",        "Calido",        "Alta",       "Si",      "No jugar"       ],
//             ["P. nublado",     "Calido",        "Alta",       "No",       "Jugar"         ],
//             ["Nublado",        "Moderado",      "Alta",       "No",       "Jugar"         ],
//             ["Nublado",        "Fresco",       "Normal",      "No",       "Jugar"         ],
//             ["Nublado",        "Fresco",       "Normal",      "Si",      "No jugar"       ],
//             ["P. nublado",     "Fresco",       "Normal",      "Si",       "Jugar"         ],
//             ["Soleado",        "Moderado",      "Alta",       "No",      "No jugar"       ],
//             ["Soleado",        "Fresco",       "Normal",      "No",       "Jugar"         ],
//             ["Nublado",        "Moderado",     "Normal",      "No",       "Jugar"         ],
//             ["Soleado",        "Moderado",     "Normal",      "Si",       "Jugar"         ],
//             ["P. nublado",     "Moderado",      "Alta",       "Si",       "Jugar"         ],
//             ["P. nublado",    "Calido",        "Normal",      "No",       "Jugar"         ],
//             ["Nublado",       "Moderado",      "Alta",        "Si",      "No jugar"       ]
//         ];
        return data[number]
      }
