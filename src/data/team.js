/**
 * Team members data.
 *
 * Schema:
 * {
 *   id: string        — unique identifier
 *   name: string      — full name
 *   role: string      — job title / role
 *   photo: string     — path to photo (relative to /public) or empty for initials avatar
 *   skills: string[]  — list of skills/technologies
 *   github: string    — GitHub profile URL (optional)
 *   linkedin: string  — LinkedIn profile URL (optional)
 *   portfolio: string — Portfolio URL (optional)
 * }
 *
 * ⚠️  Do NOT invent members or social URLs.
 *     Use clearly marked placeholders if no real data is provided.
 */

const teamMembers = [
  {
    id: 'placeholder-1',
    name: 'Add Team Member',
    role: 'Role / Title',
    photo: '',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    github: '',
    linkedin: '',
    portfolio: '',
  },
  {
    id: 'placeholder-2',
    name: 'Add Team Member',
    role: 'Role / Title',
    photo: '',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    github: '',
    linkedin: '',
    portfolio: '',
  },
  {
    id: 'placeholder-3',
    name: 'Add Team Member',
    role: 'Role / Title',
    photo: '',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    github: '',
    linkedin: '',
    portfolio: '',
  },
];

export default teamMembers;
