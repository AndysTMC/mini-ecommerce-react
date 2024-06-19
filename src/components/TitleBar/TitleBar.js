import React from "react"
import "./TitleBar.css"

export default class TitleBar extends React.Component {
    render() {
        return (
            <div className="w-100 text-center text-5 py-2">
                <h1 className="font-weight-bold anton-regular">Mini-Ecommerce</h1>
            </div>
        )
    }
}