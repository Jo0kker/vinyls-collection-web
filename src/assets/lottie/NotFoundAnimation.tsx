"use client"

import Lottie, { LottieComponentProps } from "lottie-react"

import NotFound from './json/notFound.json'

export const NotFoundAnimation = (props: Omit<LottieComponentProps, 'animationData'>) => <Lottie {...props} animationData={NotFound}  />