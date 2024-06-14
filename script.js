document.addEventListener('DOMContentLoaded', function() {
    // Simulated data for progress tracking
    let totalPoints = 0;
    let level = 1; // Initial level
    let challengeTier = 1; // Initial challenge tier
    let challengesCompleted = 0;

    // Function to update progress
    function updateProgress(points) {
        totalPoints += points;
        document.getElementById('totalPoints').textContent = totalPoints;

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        const maxPoints = 1000; // Set maximum points for progress bar
        const percentage = (totalPoints / maxPoints) * 100;
        progressBar.style.width = percentage + '%';

        // Check for level up
        const nextLevelThreshold = level * 1000; // Threshold for leveling up
        if (totalPoints >= nextLevelThreshold) {
            level++;
            document.getElementById('level').textContent = level;
            addNotification(`Congratulations! You reached Level ${level}!`);
        }
    }

    // Function to start an interactive challenge
    function startChallenge() {
        if (challengeInProgress) {
            addNotification("You can't start a new challenge while one is in progress.");
            return;
        }

        // Simulate different tiers of challenges
        const challengeTime = challengeTier * 500; // Simulated time for challenge completion
        challengeInProgress = true;
        document.getElementById('startChallenge').disabled = true;
        document.getElementById('challengeStatus').textContent = 'Challenge in progress...';

        // Simulate challenge completion after certain time
        setTimeout(() => {
            updateProgress(50); // Update progress with points earned
            challengeInProgress = false;
            document.getElementById('startChallenge').disabled = false;
            document.getElementById('challengeStatus').textContent = 'Challenge completed!';

            // Add achievement
            addAchievement('Challenge Completed', 'You completed a challenge!');
            challengesCompleted++;

            // Check for unlocking new challenge tier
            if (challengesCompleted % 3 === 0) { // Unlock a new challenge tier after every 3 completed challenges
                challengeTier++;
                addNotification(`Congratulations! You unlocked Challenge Tier ${challengeTier}!`);
            }
        }, challengeTime);
    }

    // Function to add an achievement to the list
    function addAchievement(title, description) {
        const achievementList = document.getElementById('achievementList');
        const achievementItem = document.createElement('li');
        achievementItem.innerHTML = `<strong>${title}</strong>: ${description}`;
        achievementList.appendChild(achievementItem);
    }

    // Function to add a notification to the list
    function addNotification(message) {
        const notificationList = document.getElementById('notificationList');
        const notificationItem = document.createElement('li');
        notificationItem.textContent = message;
        notificationList.appendChild(notificationItem);
    }

    // Event listener for starting a challenge
    document.getElementById('startChallenge').addEventListener('click', startChallenge);

    // Simulate receiving notifications
    setInterval(() => {
        addNotification('New challenge available! Check the Challenges page.');
    }, 15000); // Simulate new challenges available every 15 seconds
});
