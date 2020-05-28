export default function getAvatarInitials(firstName, lastName) {
    return [firstName.match(/^./g)[0].toUpperCase(), lastName.match(/^./g)[0].toUpperCase()];
}