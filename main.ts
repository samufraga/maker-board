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
    //% block='B'
    MotorB
}

//% color="#008800" weight=100 icon="\uf085" block="MAKER"
//% groups=['Motor Contínuo', 'Servo Motor']
namespace MakerBoard {

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
    /**
     *Interrompe a rotação do motor
    */

    //% block="parar motor %motor"
    //% group='Motor CC'
    //% weight=50
    //% duration.shadow=timePicker
    //% speed.min=0 speed.max=60 speed.defl=-1
    //% expandableArgumentMode="enabled"
    export function stopMotor(motor: MotorPick) {
        if (motor == MotorPick.MotorA) {
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 0)
        }
    }
    /**
     *Altera a velocidade do motor para um valor entre 0 e 100%
    */
    //% block="velocidade do motor %motor em %velocidade\\%"
    //% group='Motor CC'
    //% weight=0
    //% velocidade.min=0 velocidade.max=100

    export function motorSpeed(motor: MotorPick, velocidade: number) {
        if (motor == MotorPick.MotorA) {
            pins.analogWritePin(AnalogPin.P8, 10*velocidade)
        } else {
            pins.analogWritePin(AnalogPin.P13, 10*velocidade)
        }

    }

    //% block="girar motor %motor no sentido %direction||com velocidade %velocidade \\% | por %duration segundos"
    //% group='Motor CC'
    //% weight=100
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% velocidade.min=0 velocidade.max=100
    export function setMotorRotation(motor: MotorPick, direction: MotorDirection, velocidade: number = null, duration: number = null) {
        runMotor(motor, direction)
        if (velocidade) {
            motorSpeed(motor, velocidade)
        }
        if (duration) {
            basic.pause(duration*1000)
            stopMotor(motor)
        }

    }
}