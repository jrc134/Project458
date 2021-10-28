import React from "react"

function NavBar() {
    return (
        <>
        <div class="drop-down-memu">
            <ul>
                <li>
                    <select data-placeholder="Choose a language">
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japenese">Japense</option>
                    </select>
                </li>
                <li><a href="url" name="account-link">Account</a></li>
            </ul>

        </div>
        </>
    )
}

export default NavBar