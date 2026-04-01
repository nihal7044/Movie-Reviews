const url = new URL(window.location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "http://localhost:8000/api/v1/reviews/";

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

// New Review Card
const newCard = document.createElement("div");
newCard.innerHTML = `
<div class="row">
    <div class="column">
        <div class="card">
            <h3>New Review</h3>

            <p>
                <strong>Review:</strong>
                <input type="text" id="new_review">
            </p>

            <p>
                <strong>User:</strong>
                <input type="text" id="new_user">
            </p>

            <button onclick="saveReview('new_review','new_user')">Save</button>

        </div>
    </div>
</div>
`;
main.appendChild(newCard);

// Load Reviews
loadReviews();

function loadReviews() {
    fetch(APILINK + "movie/" + movieId)
        .then(res => res.json())
        .then(data => {
            console.log("Reviews:", data);

            data.forEach(review => {
                const div = document.createElement("div");

                div.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p><strong>Review:</strong> ${review.review}</p>
                            <p><strong>User:</strong> ${review.user}</p>

                            <button onclick="editReview('${review._id}','${review.review}','${review.user}')">Edit</button>
                            <button onclick="deleteReview('${review._id}')">Delete</button>
                        </div>
                    </div>
                </div>
                `;

                main.appendChild(div);
            });
        });
}

// Save Review
function saveReview(reviewInputId, userInputId, id = "") {

    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (!review || !user) {
        alert("Enter review and user");
        return;
    }

    const method = id ? "PUT" : "POST";
    const url = id ? APILINK + id : APILINK + "new";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            review: review,
            movieId: movieId
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.reload();
    });
}

// Edit Review
function editReview(id, review, user) {
    const element = document.getElementById(id);

    element.innerHTML = `
        <p>
            <strong>Review:</strong>
            <input type="text" id="edit_review" value="${review}">
        </p>

        <p>
            <strong>User:</strong>
            <input type="text" id="edit_user" value="${user}">
        </p>

        <button onclick="saveReview('edit_review','edit_user','${id}')">Update</button>
    `;
}

// Delete Review
function deleteReview(id) {
    fetch(APILINK + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.reload();
    });
}