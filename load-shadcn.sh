#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Array of all available shadcn UI components
SHADCN_COMPONENTS=(
  "accordion"
  "alert"
  "alert-dialog"
  "aspect-ratio"
  "avatar"
  "badge"
  "button"
  "calendar"
  "card"
  "carousel"
  "checkbox"
  "collapsible"
  "combobox"
  "command"
  "context-menu"
  "data-table"
  "date-picker"
  "dialog"
  "drawer"
  "dropdown-menu"
  "form"
  "hover-card"
  "input"
  "label"
  "menubar"
  "navigation-menu"
  "pagination"
  "popover"
  "progress"
  "radio-group"
  "resizable"
  "scroll-area"
  "select"
  "separator"
  "sheet"
  "skeleton"
  "slider"
  "sonner"
  "switch"
  "table"
  "tabs"
  "textarea"
  "toast"
  "toggle"
  "toggle-group"
  "tooltip"
)

UI_DIR="./src/components/ui"

# Display banner
echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}    Shadcn Components Installer    ${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""

# Check if specific components were provided as arguments
if [ $# -gt 0 ]; then
  if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./load-shadcn.sh                  # Install all components"
    echo "  ./load-shadcn.sh button card      # Install specific components"
    echo "  ./load-shadcn.sh --help           # Show this help message"
    echo ""
    echo -e "${YELLOW}Available components:${NC}"
    for comp in "${SHADCN_COMPONENTS[@]}"; do
      echo "  $comp"
    done
    exit 0
  fi
  components=("$@")
  echo -e "${YELLOW}Installing selected components: ${components[*]}${NC}"
else
  components=("${SHADCN_COMPONENTS[@]}")
  echo -e "${YELLOW}Installing all shadcn components${NC}"
fi

# Function to check if component is valid
is_valid_component() {
  local component=$1
  for c in "${SHADCN_COMPONENTS[@]}"; do
    if [ "$c" == "$component" ]; then
      return 0
    fi
  done
  return 1
}

# Function to check if component is already installed
is_already_installed() {
  local component=$1
  
  if [ ! -d "$UI_DIR" ]; then
    return 1
  fi
  
  # Look for component file with .tsx extension
  if [ -f "$UI_DIR/$component.tsx" ]; then
    return 0
  fi
  
  # Some components have directories
  if [ -d "$UI_DIR/$component" ]; then
    return 0
  fi
  
  return 1
}

# Count variables
total=${#components[@]}
installed=0
skipped=0
failed=0

# Install components
for component in "${components[@]}"; do
  # Validate component name
  if ! is_valid_component "$component"; then
    echo -e "${RED}❌ Invalid component: $component${NC}"
    failed=$((failed+1))
    continue
  fi
  
  # Check if already installed
  if is_already_installed "$component"; then
    echo -e "${BLUE}⏭️  Component $component is already installed. Skipping.${NC}"
    skipped=$((skipped+1))
    continue
  fi
  
  echo -e "${YELLOW}Installing $component...${NC}"
  
  # Run the shadcn CLI command
  if npx shadcn@latest add "$component"; then
    echo -e "${GREEN}✅ Successfully installed $component${NC}"
    installed=$((installed+1))
  else
    echo -e "${RED}❌ Failed to install $component${NC}"
    failed=$((failed+1))
  fi
done

# Print summary
echo ""
echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}           Installation Summary     ${NC}"
echo -e "${BLUE}====================================${NC}"
echo -e "${GREEN}✅ Successfully installed: $installed${NC}"
echo -e "${BLUE}⏭️  Already installed/skipped: $skipped${NC}"
echo -e "${RED}❌ Failed to install: $failed${NC}"
echo -e "${YELLOW}🔢 Total components processed: $total${NC}"

# Make the script executable with: chmod +x load-shadcn.sh 