// CV content rendered on the home page.
// TODO: Name, birth year, major, and CPA are real; everything else is still sample data.

export interface Profile {
	name: string;
	role: string;
	birthYear: number;
	location: string;
	github: string;
	about: string[];
}

export interface Education {
	period: string;
	school: string;
	degree: string;
	details?: string[];
}

export interface Experience {
	period: string;
	role: string;
	company: string;
	location?: string;
	highlights: string[];
	stack?: string[];
}

export interface TechGroup {
	category: string;
	items: string[];
}

export const PROFILE: Profile = {
	name: 'Lam Thanh Bui',
	role: 'DevOps Engineer',
	birthYear: 2002,
	location: 'Hanoi, Vietnam',
	github: 'https://github.com/thanhbl-hust',
	about: [
		'DevOps Engineer who enjoys turning manual, error-prone processes into reliable, automated pipelines. I work across cloud infrastructure, containers, and CI/CD, with a focus on making systems observable and easy to operate.',
		'This site is where I keep my CV and write down what I learn along the way.',
	],
};

export const EDUCATION: Education[] = [
	{
		period: '2018 – 2023',
		school: 'Hanoi University of Science and Technology (HUST)',
		degree: "Engineer's Degree in Computer Science",
		details: ['CPA: 3.16 / 4.0'],
	},
];

export const EXPERIENCE: Experience[] = [
	{
		period: '2023 – Present',
		role: 'DevOps Engineer',
		company: 'Company Name',
		location: 'Hanoi, Vietnam',
		highlights: [
			'Built and maintained CI/CD pipelines for 20+ microservices with GitHub Actions and Argo CD.',
			'Provisioned AWS infrastructure as code with Terraform, using reusable modules across environments.',
			'Set up monitoring and alerting with Prometheus and Grafana, reducing time to detect incidents.',
		],
		stack: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Argo CD'],
	},
	{
		period: '2022 – 2023',
		role: 'DevOps Intern',
		company: 'Company Name',
		location: 'Hanoi, Vietnam',
		highlights: [
			'Containerized legacy applications with Docker and migrated them to Kubernetes.',
			'Wrote Bash and Python scripts to automate routine server operations.',
		],
		stack: ['Docker', 'Kubernetes', 'Linux', 'Bash'],
	},
];

export const TECH_STACK: TechGroup[] = [
	{ category: 'cloud', items: ['AWS', 'Google Cloud'] },
	{ category: 'containers', items: ['Docker', 'Kubernetes', 'Helm'] },
	{ category: 'infrastructure as code', items: ['Terraform', 'Ansible'] },
	{ category: 'ci/cd', items: ['GitHub Actions', 'GitLab CI', 'Argo CD'] },
	{ category: 'observability', items: ['Prometheus', 'Grafana', 'Loki'] },
	{ category: 'languages', items: ['Bash', 'Python', 'Go'] },
	{ category: 'os & networking', items: ['Linux', 'Nginx', 'DNS', 'TCP/IP'] },
];
