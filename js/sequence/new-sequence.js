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
        "time": 0.00,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": "snare",
                    "velocity": 0.5
                }
            },
            {
                "layer": 2,
                "type": "osc",
                "params": {
                    "pitch": "1600",
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
                    "sample": "snare",
                    "velocity": 0.5
                }
            },
            {
                "layer": 2,
                "type": "osc",
                "params": {
                    "pitch": "1600",
                    "velocity": 0.5
                }
            }
        ]
    },
    {
        "time": 0.99,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": "snare",
                    "velocity": 0.5
                }
            },
            {
                "layer": 2,
                "type": "osc",
                "params": {
                    "pitch": "1600",
                    "velocity": 0.5
                }
            }
        ]
    }
];