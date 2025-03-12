export const getAllSubscriptions = () => {
    return fetch("http://localhost:8088/subscriptions").then((res) => res.json())
}

export const createNewSubscription = (subscriptionToCreate) => {
    return fetch("http://localhost:8088/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(subscriptionToCreate)
    })
}