export default function getAvatarInitials(firstName, lastName) {
    return [firstName.match[0].match(/\b\w/g) || [], lastName.match[0]
.match(/\b\w/g) || []]
    
}