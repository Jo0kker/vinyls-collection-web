'use client'

import { Table } from 'flowbite-react'

export default function TableTrackList({ tracks }: { tracks: any }) {
    return (
        <div className="flex w-full flex-col items-center gap-1">
            <Table className="w-full table-auto text-sm">
                <Table.Body className="divide-y">
                    {tracks.map((track: any, index: number) => {
                        return (
                            <Table.Row
                                key={index}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {track.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {track.duration}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
