# Introduction 
This repository contains the code for the IconPicker (Umbraco). After installing the package, a new IconPicker datatype is available. This datatype can be used to select svg icons out of an svgsprite placed in wwwroot/svgsprites.

# Example backoffice 
![iconpicker](https://github.com/user-attachments/assets/fccaaa33-c778-4f8d-ab06-35bebe21c84d)

# Example datatype
<img width="1093" height="520" alt="image" src="https://github.com/user-attachments/assets/246455ec-6d57-4950-963b-c4aba32398b2" />

# Installation
Installing through command line:

```bash
dotnet add package Umbraco.Community.IconPicker
```

Or package reference: 

```
<PackageReference Include="Umbraco.Community.IconPicker" Version="{version-number}" />
```

# Configuration
After installation, you can enable the IconPicker datatype by using the extension method `AddIconPicker()`. For example, you can do this through a Composer as shown below:

```csharp
using Umbraco.Community.IconPicker.Compose;
using Umbraco.Cms.Core.Composing;

namespace YourApp.Compose;

public class AppComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddIconPicker();
    }
}
```

