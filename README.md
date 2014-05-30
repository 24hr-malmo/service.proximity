Proximity service
=================

Our proximity service will publish ibeacons it detects and send its payload.

Subscribe to "IBEACON" and you will get a message containing the following info (example):

    {
        uuid: [hexstring],
        major: [integer],
        minor: [integer],
        measuredPower: [integer],
        rssi: [integer],
        accuracy: [float], // value in meters
        proximity: [string] // immidiate, near, far
    }
