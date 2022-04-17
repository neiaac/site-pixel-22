import React from 'react'
import { loadingComponent } from '../styles/navbar.module.css';


export default function Loading() {
    return (
        <div className={loadingComponent}>
            <p>A carregar...</p>
        </div>
    )
}
