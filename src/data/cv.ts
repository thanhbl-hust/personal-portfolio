// CV content rendered on the home page.
// TODO: Name, birth year, major, and CPA are real; everything else is still sample data.

export interface Profile {
	name: string;
	role: string;
	birthYear: number;
	location: string;
	github: string;
	linkedin: string;
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
	linkedin: 'https://www.linkedin.com/in/thanh-bl/',
	about: [
		'DevOps/Cloud Engineer with 3+ years running production infrastructure on AWS, from backend services for Samsung Internet at Samsung R&D Vietnam to a Kubernetes platform for a fintech/EV-charging product, designed end-to-end from client requirements. Builds everything as code with Terraform, operates EKS with Karpenter and GitOps (Argo CD), and owns the security and compliance layer: secrets management with Vault and SOC 2 controls through Vanta. Focused on infrastructure that is reliable, cost-efficient, and audit-ready.',
		'This site is where I keep my CV and write down what I learn along the way.',
	],
};

export const EDUCATION: Education[] = [
	{
		period: '03/2024 – 06/2024',
		school: 'Samsung Talent Program (STP)',
		degree: 'Scholarship',
	},
	{
		period: '2020 – 2024',
		school: 'Hanoi University of Science and Technology (HUST)',
		degree: "Bachelor's Degree in Computer Science",
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
	{
		category: 'security & compliance',
		items: ['SOPS', 'External Secrets', 'Trivy', 'Gitleaks', 'Firezone (WireGuard)', 'Vanta (SOC 2)'],
	},
	{ category: 'cloud platform', items: ['AWS'] },
	{ category: 'infrastructure as code', items: ['Terraform', 'Atlantis', 'TFLint', 'tfsec', 'Checkov'] },
	{ category: 'containerization & orchestration', items: ['Docker', 'Kubernetes', 'KEDA', 'Karpenter', 'Helm', 'Kustomize'] },
	{ category: 'ci/cd & gitops', items: ['GitHub Actions', 'GitLab', 'Argo CD'] },
	{ category: 'observability', items: ['Prometheus', 'Grafana', 'Loki', 'Alloy', 'Fluent Bit'] },
];
