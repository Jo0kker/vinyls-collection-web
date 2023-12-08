"use client"

import Lottie, { LottieComponentProps } from "lottie-react"

import vinylsAnimation from './json/sound-animation.json'

export const SoundAnimation = (props: Omit<LottieComponentProps, 'animationData'>) => <Lottie {...props} animationData={vinylsAnimation} />