'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { Store } from '../lib/store'

export default function StoreProvider({ children }) {
    const storeRef = useRef()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = Store()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}