/*
ENA=P8, IN1=P12, IN2=P16
ENB=P13, IN3=P14, IN4=P15
*/

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

enum ServoDegrees{
    //%block="45°"
    //%block="90°"
    //%block="135°"
    //%block="180°"
    //%block="225°"
    //%block="270°"
    //%block="315°"
    //%block="360°"
}

//% color="#008800" weight=100 icon="\f085" block="Escola 4.0"
//% groups=['Motor Contínuo', 'Servo Motor']
namespace MakerBoard {
    let MotorCounter = 0
    let MotorCounterMax = 0
    export function runMotor(motor: MotorPick, direction: MotorDirection) {
        if (motor == MotorPick.MotorA) {
            if (direction == MotorDirection.Clockwise) {
                pins.digitalWritePin(DigitalPin.P12, 0)
                pins.digitalWritePin(DigitalPin.P16, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P12, 1)
                pins.digitalWritePin(DigitalPin.P16, 0)
            }
        } else {
            if (direction == MotorDirection.Clockwise) {
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P15, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P15, 0)
            }
        }
    }
    control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
        MotorCounter += 1
        if (MotorCounter == MotorCounterMax) {
            pins.setEvents(DigitalPin.P0, PinEventType.None)
            MakerBoard.stopMotor(MotorPick.MotorA)
        }
    })
    /**
     * Liga o motor no sentido escolhido com velocidade e duração opcionais
     */
    //% block="girar motor %motor no sentido %direction || com velocidade %speed \\% por %duration segundos"
    //% group='Motor Contínuo'
    //% weight=100
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% speed.min=0 speed.max=100
    export function setMotorRotation(motor: MotorPick, direction: MotorDirection, speed: number = null, duration: number = null) {
        runMotor(motor, direction)
        if (speed != null) {
            motorSpeed(motor, speed)
        }
        if (duration) {
            basic.pause(duration * 1000)
            stopMotor(motor)
        }
    }

    /**
     * Interrompe a rotação do motor
     */
    //% block="parar motor %motor"
    //% group='Motor Contínuo'
    //% weight=50
    export function stopMotor(motor: MotorPick) {
        if (motor == MotorPick.MotorA) {
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.digitalWritePin(DigitalPin.P16, 1)
            pins.digitalWritePin(DigitalPin.P8, 1)
        }
        else {
            pins.digitalWritePin(DigitalPin.P14, 1)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.digitalWritePin(DigitalPin.P13, 13)
        }
    }
    /**
     * Altera a velocidade do motor para um valor entre 0 e 100%
     */
    //% block="velocidade do motor %motor em %speed\\%"
    //% group='Motor Contínuo'
    //% weight=0
    //% speed.min=0 speed.max=100
    export function motorSpeed(motor: MotorPick, speed: number) {
        if (motor == MotorPick.MotorA) {
            pins.analogWritePin(AnalogPin.P8, 10 * speed)
        } else {
            pins.analogWritePin(AnalogPin.P13, 10 * speed)
        }
    }

    /**
     * Liga o motor no sentido escolhido com velocidade e duração opcionais
     */
    //% block="girar servo motor %motor no sentido %direction || com velocidade %speed \\% | por %value %unit"
    //% group='Servo Motor'
    //% weight=100
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% speed.min=0 speed.max=100
    export function setServoMotor(motor: MotorPick, direction: MotorDirection, speed: number = null, value: number = null, unit: MoveUnit = MoveUnit.Rotations) {
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
        pins.setEvents(DigitalPin.P0, PinEventType.Edge)
        if (speed != null) {
            motorSpeed(motor, speed)
        }
        if (value != null) {
            switch (unit) {
                case MoveUnit.Rotations:
                    MotorCounter = 0
                    MotorCounterMax = value * 20 - 2
                    runMotor(motor, direction)
                    while (MotorCounter < MotorCounterMax) {
                        basic.pause(1)
                    }
                    break;
                case MoveUnit.Seconds:
                    runMotor(motor, direction)
                    basic.pause(value * 1000)
                    stopMotor(motor)
                    break;
            }
        }
    }
}
