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

enum MathSign {
    //%block="+"
    Positive,
    //%block="-"
    Negative
}

//% color="#008800" weight=100 icon="\uf1b0" block="Escola 4.0"
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
            stopMotor(MotorPick.MotorA)
        }
    })
    /**
     * Gira o motor em uma dada velocidade por um tempo limitado (opcional). Se a velocidade for positiva,
     * o motor gira em um sentido, se for negativa, o motor gira no sentido inverso
     */
    //% block="girar motor %motor com velocidade %speed\\% || por %duration segundos"
    //% group='Motor Contínuo'
    //% weight=100
    //% expandableArgumentMode="enabled"
    //% speed.shadow="speedPicker"
    //% duration.min=0
    export function runContMotor(motor: MotorPick, speed: number, duration: number = 0) {
        motorSpeed(motor, Math.abs(speed))
        if (speed > 0) {
            runMotor(motor, MotorDirection.Clockwise)
        } else {
            runMotor(motor, MotorDirection.CounterClockwise)
        }
        basic.pause(duration * 1000)
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
     * Altera a velocidade do motor para um valor entre 0 e 100% (sem alterar o sentido de rotação)
     */
    //% block="velocidade do motor %motor em %velocidade\\%"
    //% group='Motor Contínuo'
    //% weight=0
    //% velocidade.min=0 velocidade.max=100
    export function motorSpeed(motor: MotorPick, velocidade: number) {
        if (motor == MotorPick.MotorA) {
            pins.analogWritePin(AnalogPin.P8, 10 * velocidade)
        } else {
            pins.analogWritePin(AnalogPin.P13, 10 * velocidade)
        }
    }

    /**
     * Liga o servo motor no sentido escolhido com velocidade e duração opcionais
     */
    //% block="girar servo motor %motor com velocidade %speed\\% | por %value %unit"
    //% group='Servo Motor'
    //% weight=100
    //% expandableArgumentMode="toggle"
    //% speed.shadow="speedPicker"
    export function runServoMotor(motor: MotorPick, speed: number, value: number = null, unit: MoveUnit = MoveUnit.Rotations) {
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
        pins.setEvents(DigitalPin.P0, PinEventType.Edge)
        if (speed > 0) {
            let direction = MotorDirection.Clockwise
        } else {
            let direction = MotorDirection.CounterClockwise
        }
        if (value != null) {
            switch (unit) {
                case MoveUnit.Rotations:
                    MotorCounter = 0
                    MotorCounterMax = value * 80 - 8
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
    /**
     * Graus de rotação do servo motor
     */
    //%block="girar servo motor %sign %degrees"
    //%group='Servo Motor'
    export function runServoDegrees(sign: MathSign, degrees: ServoDegrees) {

    }
}
