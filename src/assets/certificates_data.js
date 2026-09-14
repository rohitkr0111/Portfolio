import certGenAI   from './Certificate- GEN AI.jpg';
import certPowerBI from './Certificate- Power BI.jpg';
import certSQL     from './Certificate- SQL.jpg';
import certHCL     from './HCL GUVI Certification - P7p556Jo98g81qh728.png';

/*
  HOW TO ADD MORE CERTIFICATES:
  1. Drop the image file into src/assets/
  2. Import it above (follow the same pattern)
  3. Duplicate an object below and fill in the fields
  4. Set  image: <your imported variable>
*/

const certificates_data = [
  {
    id: 1,
    title: 'Generative AI',
    issuer: 'LinkedIn Learning',
    date: '2026',
    image: certGenAI,
    link: '#',
    tags: ['AI', 'LLM', 'Gemini'],
    color: '#68d391',
  },
  {
    id: 2,
    title: 'Power BI',
    issuer: 'LinkedIn Learning',
    date: '2026',
    image: certPowerBI,
    link: '#',
    tags: ['Data Visualisation', 'BI', 'Analytics'],
    color: '#f6ad55',
  },
  {
    id: 3,
    title: 'SQL',
    issuer: 'LinkedIn Learning',
    date: '2026',
    image: certSQL,
    link: '#',
    tags: ['SQL', 'Databases', 'Queries'],
    color: '#63b3ed',
  },
  {
    id: 4,
    title: 'HCL GUVI Certification',
    issuer: 'HCL × GUVI',
    date: '2025',
    image: certHCL,
    link: '#',
    tags: ['Full-Stack', 'HCL', 'GUVI'],
    color: '#c9a96e',
  },
];

export default certificates_data;
