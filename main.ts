enum MotorDirection {
    //% block="direto"
    Clockwise,
    //% block="inverso"
    CounterClockwise
}
enum MotorPick {
    //% block="A"
    MotorA,
    //% block="B"
    MotorB
}
enum MoveUnit {
    //% block="rotações"
    Rotations,
    //% block="segundos"
    Seconds
}

enum ServoDegrees {
    //%block="45°"
    d45 = 1,
    //%block="90°"
    d90 = 2,
    //%block="135°"
    d135 = 3,
    //%block="180°"
    d180 = 4,
    //%block="225°"
    d225 = 5,
    //%block="270°"
    d270 = 6,
    //%block="315°"
    d315 = 7,
    //%block="360°"
    d60 = 8
}

//% color="#2695B5" weight=100 icon="\uf1b0" block="Escola 4.0"
//% groups=['Motores', 'Servo Motor']
namespace MakerBoard {
    let MotorCounterA = 0
    let MotorCounterMaxA = 0
    let MotorCounterB = 0
    let MotorCounterMaxB = 0

    export function runMotor(motor: MotorPick, direction: MotorDirection) {
        if (motor == MotorPick.MotorA) {
            if (direction == MotorDirection.Clockwise) {
                pins.digitalWritePin(DigitalPin.P5, 0)
                pins.digitalWritePin(DigitalPin.P0, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P5, 1)
                pins.digitalWritePin(DigitalPin.P0, 0)
            }
        } else {
            if (direction == MotorDirection.Clockwise) {
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.digitalWritePin(DigitalPin.P16, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P15, 1)
                pins.digitalWritePin(DigitalPin.P16, 0)
            }
        }
    }

    export function setServoSensor(motor: MotorPick) {
        if (motor == MotorPick.MotorA) {
            pins.setPull(DigitalPin.P11, PinPullMode.PullNone)
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
            pins.setEvents(DigitalPin.P11, PinEventType.Edge)
            pins.setEvents(DigitalPin.P2, PinEventType.Edge)
        } else {
            pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
            pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
            pins.setEvents(DigitalPin.P13, PinEventType.Edge)
            pins.setEvents(DigitalPin.P14, PinEventType.Edge)
        }
    }

    control.onEvent(EventBusSource.MICROBIT_ID_IO_P11, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
        MotorCounterA += 1
        if (MotorCounterA == MotorCounterMaxA) {
            pins.setEvents(DigitalPin.P11, PinEventType.None)
            pins.setEvents(DigitalPin.P2, PinEventType.None)
            stopMotor(MotorPick.MotorA)
        }
    })
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P11, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
        MotorCounterA += 1
        if (MotorCounterA == MotorCounterMaxA) {
            pins.setEvents(DigitalPin.P11, PinEventType.None)
            pins.setEvents(DigitalPin.P2, PinEventType.None)
            stopMotor(MotorPick.MotorA)
        }
    })
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
        MotorCounterA += 1
        if (MotorCounterA == MotorCounterMaxA) {
            pins.setEvents(DigitalPin.P11, PinEventType.None)
            pins.setEvents(DigitalPin.P2, PinEventType.None)
            stopMotor(MotorPick.MotorA)
        }
    })
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
        MotorCounterA += 1
        if (MotorCounterA == MotorCounterMaxA) {
            pins.setEvents(DigitalPin.P11, PinEventType.None)
            pins.setEvents(DigitalPin.P2, PinEventType.None)
            stopMotor(MotorPick.MotorA)
        }
    })
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P13, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
        MotorCounterB += 1
        if (MotorCounterB == MotorCounterMaxB) {
            pins.setEvents(DigitalPin.P13, PinEventType.None)
            pins.setEvents(DigitalPin.P14, PinEventType.None)
            stopMotor(MotorPick.MotorB)
        }
    })
    
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P13, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
        MotorCounterB += 1
        if (MotorCounterB == MotorCounterMaxB) {
            pins.setEvents(DigitalPin.P13, PinEventType.None)
            pins.setEvents(DigitalPin.P14, PinEventType.None)
            stopMotor(MotorPick.MotorB)
        }
    })
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P14, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
        MotorCounterB += 1
        if (MotorCounterB == MotorCounterMaxB) {
            pins.setEvents(DigitalPin.P13, PinEventType.None)
            pins.setEvents(DigitalPin.P14, PinEventType.None)
            stopMotor(MotorPick.MotorB)
        }
    })
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P14, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
        MotorCounterB += 1
        if (MotorCounterB == MotorCounterMaxB) {
            pins.setEvents(DigitalPin.P13, PinEventType.None)
            pins.setEvents(DigitalPin.P14, PinEventType.None)
            stopMotor(MotorPick.MotorB)
        }
    })

    /**
     * Gira o motor em uma dada velocidade por um tempo limitado (opcional). Se a velocidade for positiva,
     * o motor gira em um sentido, se for negativa, o motor gira no sentido inverso
     */
    //% block="girar motor %motor com velocidade %speed\\% || por %duration segundos"
    //% group='Motores'      weight=100
    //% expandableArgumentMode="enabled"    inlineInputMode=inline
    //% speed.shadow="speedPicker"
    //% duration.min=0
    export function runContMotor(motor: MotorPick, speed: number, duration: number = 0) {
        motorSpeed(motor, Math.abs(speed))
        if (speed > 0) {
            runMotor(motor, MotorDirection.Clockwise)
        } else {
            runMotor(motor, MotorDirection.CounterClockwise)
        }
        if (duration != 0) {
            basic.pause(duration * 1000)
            stopMotor(motor)
        }
    }

    /**
     * Interrompe a rotação do motor
     */
    //% block="parar motor %motor"
    //% group='Motores'      weight=50
    export function stopMotor(motor: MotorPick) {
        if (motor == MotorPick.MotorA) {
            pins.digitalWritePin(DigitalPin.P0, 1)
            pins.digitalWritePin(DigitalPin.P1, 1)
            pins.digitalWritePin(DigitalPin.P5, 1)
        }
        else {
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.digitalWritePin(DigitalPin.P16, 1)
        }
    }
    /**
     * Altera a velocidade do motor para um valor entre 0 e 100% (sem alterar o sentido de rotação)
     */
    // block="velocidade do motor %motor em %velocidade\\%"
    //% group='Motores'      weight=0
    //% velocidade.min=0 velocidade.max=100
    export function motorSpeed(motor: MotorPick, velocidade: number) {
        if (motor == MotorPick.MotorA) {
            pins.analogWritePin(AnalogPin.P1, 10 * velocidade)
        } else {
            pins.analogWritePin(AnalogPin.P8, 10 * velocidade)
        }
    }

    /**
     * Gira o servo motor por uma quantidade limitada de rotações
     */
    //% block="girar servo motor %motor por %value rotações com velocidade %speed\\%"
    //% group='Servo Motor'     weight=100
    //% expandableArgumentMode="toggle"     inlineInputMode=inline
    //% speed.shadow="speedPicker"
    export function runServoMotor(motor: MotorPick, value: number = 0, speed: number) {
        setServoSensor(motor)
        let direction
        if (speed > 0) {
            direction = MotorDirection.Clockwise
        } else {
            direction = MotorDirection.CounterClockwise
        }
        if (value != 0) {
            MotorCounterA = 0
            MotorCounterMaxA = value * 80 - 8
            MotorCounterB = 0
            MotorCounterMaxB = value * 80 - 8
            motorSpeed(motor, Math.abs(speed))
            runMotor(motor, direction)
            if (motor==MotorPick.MotorA) {
                while (MotorCounterA < MotorCounterMaxA) {
                    basic.pause(1)
                }                
            }else{
                while (MotorCounterB < MotorCounterMaxB) {
                    basic.pause(1)
                }
            }
        }
    }
    /**
     * Gira o servo motor por uma quantidade limitada de graus
     */
    //%block="girar servo motor %motor %degrees com velocidade %speed\\%"
    //%group='Servo Motor'
    //%speed.shadow="speedPicker"
    export function runServoDegrees(motor: MotorPick, degrees: ServoDegrees, speed: number) {

    }
}
