"use client"

import Lottie, { LottieComponentProps } from "lottie-react"

import vinylsAnimation from './json/vinyl-loading.json'

export const VinylLoading = (props: Omit<LottieComponentProps, 'animationData'>) => <Lottie {...props} animationData={vinylsAnimation}  />