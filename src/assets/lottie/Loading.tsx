"use client"

import Lottie, { LottieComponentProps } from "lottie-react"

import vinylsAnimation from './json/loading.json'

export const Loading = (props: Omit<LottieComponentProps, 'animationData'>) => <Lottie {...props} animationData={vinylsAnimation}  />