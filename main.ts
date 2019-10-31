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

//% color="#008800" weight=100 icon="\uf1ec" block="MAKER"
//% groups=['Motor CC', 'Servo Motor'
namespace MakerBoard {
    //% block="ligar motor %motor"
    //% group='Motor CC'
    //% weight=100
    //% duration.shadow=timePicker
    //% speed.min=0 speed.max=60
    //% expandableArgumentMode="enabled"
    export function MotorOn(motor: MotorPick) {

    }

    //% block="parar motor %motor"
    //% group='Motor CC'
    //% weight=90
    //% duration.shadow=timePicker
    //% speed.min=0 speed.max=60 speed.defl=-1
    //% expandableArgumentMode="enabled"
    export function MotorOff(motor: MotorPick) {

    }

    //% block="mudar velocidade do motor %motor para %velocidade"
    //% group='Motor CC'
    //% weight=50
    //% velocidade.min=0 velocidade.max=100
    export function setMotorSpeed(motor: MotorPick, velocidade: number, ) {

    }

    //% block="girar motor %motor||no sentido %direction|com velocidade %velocidade|por %duration segundos"
    //% group='Motor CC'
    //% weight=100
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% direction.defl=-1
    //% velocidade.min=0 velocidade.max=100
    //% duration.defl=-1
    export function setMotorRotation(motor: MotorPick, direction: MotorDirection, velocidade: number, duration: number) {

    }
}