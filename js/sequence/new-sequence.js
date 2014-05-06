var DEFAULT_AUDIO = {
    "sample": "snare",
    "velocity": 0.5
};

var DEFAULT_OSC = {
    "pitch": "1600",
    "velocity": 0.5
};

// try to not have layer cause it's not a part of the sequence

var SEQUENCE = [
    {
        "time": 0,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.25,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.5,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 2,
                    "velocity": 0.5
                }
            },
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.75,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
];


var SEQUENCE1 = [
    {
        "time": 0,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            },
            {
                "layer": 2,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            },
            {
                "layer": 2,
                "type": "osc",
                "params": {
                    "sample": 2,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.1,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.11,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.12,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.13,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.14,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 2,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.15,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.16,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.17,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.18,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 2,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.19,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.195,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 3,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.2,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            },
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.3,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.4,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            },
            {
                "layer": 1,
                "type": "osc",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.5,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            },
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.6,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.7,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.8,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            },
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            },
            {
                "layer": 1,
                "type": "osc",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.9,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 0,
                    "velocity": 0.5
                }
            }
        ]
    },


    {
        "time": .9,
        "events": [
            {
                "layer": 2,
                "type": "osc",
                "params": {
                    "pitch": 1,
                    "velocity": 0.5
                }
            },
            {
                "layer": 2,
                "type": "audio",
                "params": {
                    "sample": 2,
                    "velocity": 0.5
                }
            }
        ]
    }
    // ,
    // {
    //     "time": 2,
    //     "events": [
    //         {
    //             "layer": 1,
    //             "type": "audio",
    //             "params": {
    //                 "sample": 0,
    //                 "velocity": 0.5
    //             }
    //         }
    //         // ,
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 1,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 0,
    //         //         "velocity": 0.5
    //         //     }
    //         // },
    //         // {
    //         //     "layer": 2,
    //         //     "type": "audio",
    //         //     "params": {
    //         //         "sample": 1,
    //         //         "velocity": 0.5
    //         //     }
    //         // }
    //     ]
    // },
    // {
    //     "time": 3,
    //     "events": [
    //         {
    //             "layer": 1,
    //             "type": "audio",
    //             "params": {
    //                 "sample": 0,
    //                 "velocity": 0.5
    //             }
    //         },
    //         {
    //             "layer": 2,
    //             "type": "osc",
    //             "params": {
    //                 "pitch": 1,
    //                 "velocity": 0.5
    //             }
    //         }
    //     ]
    // }
];