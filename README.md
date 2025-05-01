# Configure GitHub Credentials Action

This action configures GitHub credentials so that private repositories can be accessed.

## Usage

Basic usage:
```yaml
steps:
  - name: Configure GitHub Credentials
    uses: authzbot/configure-github-credentials@v1
    id-token: write  # Required for OIDC token generation
```

## Example Use Cases

### Installing Python Packages from Private Repositories
```yaml
steps:
  - name: Configure GitHub Credentials
    uses: authzbot/configure-github-credentials@v1
    id-token: write

  - name: Install package from private repo
    run: |
      pip install git+https://github.com/owner/private-package.git
```

### Installing Node.js Packages from Private Repositories
```yaml
steps:
  - name: Configure GitHub Credentials
    uses: authzbot/configure-github-credentials@v1
    id-token: write

  - name: Install package from private repo
    run: |
      npm install owner/private-package
```

### Cloning and Using Private Repositories
```yaml
steps:
  - name: Configure GitHub Credentials
    uses: authzbot/configure-github-credentials@v1
    id-token: write

  - name: Clone and use private repo
    run: |
      git clone https://github.com/owner/private-repo.git
      cd private-repo
      # Use the repository contents...
```

### Using a Private Terraform Module
```yaml
steps:
  - name: Configure GitHub Credentials
    uses: authzbot/configure-github-credentials@v1
    id-token: write

  - name: Run Terraform with private module
    run: |
      terraform init
      terraform plan
      terraform apply
```

In your Terraform configuration, you can reference the private module like this:
```hcl
module "example" {
  source = "github.com/owner/private-terraform-module"
  # ... other module configuration ...
}
```

## How it Works

1. AuthzBot API provides the GitHub credentials.
2. The then action invokes `git config` to configure git to use the credentials for repos hosted on github.com.
3. After this step, any git operations in the workflow will automatically use the configured credentials to access any repository that AuthzBot has been authorized to access

## License

[MIT](LICENSE) 
