# README
This is a data visualization dashboard built with Observable Framework, focusing on Swiss innovation and entrepreneurship metrics with international benchmarking.

### Core Structure
- **Pages**: Pages in main directory
- **Data**: Files in `_file/data/`

### Key Components
- **Plot library**: Uses `@observablehq/plot` for all visualizations
- **Data processing**: `arquero` for data manipulation, similar to pandas/dplyr
- **Styling**: Custom CSS with Observable's design system

### Application Structure
- **International benchmarking** section with 5 main areas:
  - Research & Development (`a_rnd.html`)
  - Entrepreneurship and Start-ups (`b_ens.html`) 
  - Innovation Activities (`c_inno.html`)
  - Knowledge and Technology Transfer (`d_ktt.html`)
  - Sustainability and High-tech Exports (`e_snd.html`)
- **National topics** covering innovation reports, investor analysis, and unicorn tracking

### Data Sources
Primarily OECD, Eurostat, and Swiss innovation survey data with automated processing pipelines for regular updates.
