---
layout: post
title: Responsive Optimization Best Practices
---

# Responsive Optimization Best Practices

## Summary

As the growing trend of websites being viewed on handheld devices
continues, it’s imperative that the content being served is providing
the best experience for the user regardless of their chosen device.
Responsive sites can make content look sleek and provide better layouts
for the user’s chosen device, but having unoptimized images slows the
whole system down.

When it comes to delivering optimized images, there’s a sliding scale
between resolution and image size. Obviously, we want the highest
resolution possible with the lowest image size. In most current
responsive frameworks this scale is balanced by creating an image tag
with multiple sources, and leaving it up to the browser to pick the
right source at runtime.

> &lt;img srcset="example-480w.jpg 480w,
> 
> example-800w.jpg 800w"
> 
> sizes="(max-width: 600px) 480px,
> 
> 800px"
> 
> src="example-800w.jpg"&gt;

The above bootstrap example will return a 480px or 800px version of the
image depending on the viewport size. In order to make this happen,
there must exist images cut to these particular proportions available in
advance. A task which falls in the laps of most content authors when it
comes to adding images to their articles.

## Providing the Best Experience

In order ensure that optimization is always respected during the site
build process we’ve put together this set of best practices:

1.  **Compress all possible assets.**

    1.  In general, runtime servers should be configured to return all
        content compressed with [Brotli](https://brotli.org/) or
        [GZIP](https://www.gnu.org/software/gzip/). This provides
        savings across the board as less content is transferred and all
        modern browsers can support these algorithms.

    2.  Minify styles and scripts. Every style or script served should
        be minified if possible. This will significantly reduce the file
        size. Klish Group has built minification into publish workflows
        for past builds in order to automate the procedure.

    3.  Use the best image format, when possible. Most of the time this
        is PNG, but WebP is quickly becoming the new standard as it’s
        adopted by more browers ([Image Format
        Comparison](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types))

2.  **Start with high resolution images.** There’s nothing more
    frustrating than having a pixelated image taking up the full
    viewport. We request that all images being used are at least 1600
    x 500. A smaller height can be used if skinny banners are a part of
    the design, but keeping the width to 1600 ensures that even on the
    largest screens the image will not pixelate.

3.  **Target high value images in layout.** Sometimes it’s not possible
    to provide responsive images with multiple breakpoints for every
    image on a site. In those cases we identify the greatest return for
    optimizations by gauging the size of the image in the layout (the
    bigger the image the bigger the optimization gains) and how often a
    page is expected to be viewed (target images on home page versus
    contact page). As such ,the lowest hanging fruit is generally large
    heroes, banners, carousels, profile pictures, etc.

4.  **Know your breakpoints.** Setting your layout’s breakpoints early
    can help determine image dimensions and can help predict the level
    of additional work that will be needed to resize images. Breakpoints
    exist on a floating scale between optimization and image resize
    work, ideally we want to optimize to as many viewports as possible
    but there are diminishing returns producing images in many
    dimensions. We follow the default bootstrap breakpoints as a
    starting point for our designs:

> Larger mobile phones (devices with resolutions ≥ 576px);
>
> Tablets (≥768px);
>
> Laptops (≥992px);
>
> Desktops (≥1200px)

Working with Cloudinary, we’ve embraced an automated alternative to
manually cutting images to match breakpoint sizes. Instead of providing
an srcset of images at different sizes, authors include a single URL to
their image and then Cloudinary takes over the job of determining the
correct (custom-defined) viewport and providing an image with the
correct dimensions in an optimized file format.

## Using the Power of Cloudinary Transforms

By utilizing Cloudinary’s on-the-fly transformations along with some
conditional logic we’re able to produce a single URL that will
automatically return an image that is:

-   Aware of both the size of the device viewport and the image’s own
    container

-   Optimized for the give pre-defined breakpoint

-   Automatically cropped to fit given dimensions (optional)

-   Using the best-available file format

Using custom transforms we’re able to inject
“t\_viewport\_and\_container\_aware” into a Cloudinary image URL. When
the image is loaded on a device, JavaScript injects the viewport and
container sizes into the URL as well. Then the transform takes those
variables and compares them to pre-determined breakpoints to determine
what size image to return.

Here’s an example URL as it would be in the CMS:

> https://res.cloudinary.com/example/image/upload/**t\_viewport\_and\_container\_aware**/Test/planet-earth-banner.jpg

At runtime the viewport width (vw) and container width (cw) are added:

> Note: The container size is compared against the breakpoints first, as
> there is no reason to return a 1200px wide image on a page that is
> 1200px wide if the image’s parent container only takes up 25% of the
> page. Instead a 300px wide image is more optimized.
>
> Note: The container width cannot be obtained in elements where the
> container is hidden on page load (carousels, tabbed content, etc). In
> which case the viewport width is used.
>
> https://res.cloudinary.com/example/image/upload/$vw\_999/$cw\_995/t\_viewport\_and\_container\_aware/Test/planet-earth-banner.jpg

Using the case above the container width is 995px and comparing that to
the default best practice breakpoints requires that cloudinary returns
an image with a width greater than 992px. In that case, cloudinary would
return a 1000px wide image.

In addition to determining the width of the return image we can set
specific aspect ratios and let Cloudinary auto-crop content to fit. To
facilitate this, Klish Group has developed a set of default transforms
for popular aspect ratios. The default transforms make use of
Cloudinary’s auto-gravity algorithm with searches for faces or points of
interest in the image to focus on. Instead of automatically determining
the focal point we can also force Cloudinary to use the image center.
For example:

<img src="\just-the-docs\assets\images\docs\public\automatic-image-optimization\image1.png" style="width:6.5in;height:3.5375in" alt="Graphical user interface, website Description automatically generated" />

While these transforms are exist independently of the content aware
transform mentioned above, the utility can be combined in order to
provide specific aspect ratios, or any other image manipulation, based
on breakpoints.

## Default Image Transforms

Klish Group has created a handful of default transforms that can be used
automatically by adding them to a Cloudinary URL. These can be used to
ensure images are device aware and can also be honed in to automatically
crop and return a particular aspect ratio.

**<u>Content Aware</u>**

-   t\_viewport\_and\_container\_aware – Picks breakpoint based on
    viewport or container size

**<u>Breakpoints</u>**

-   t\_sm\_viewport\_img – Returns 800px image

-   t\_md\_viewport\_img – Returns 1000px image

-   t\_lg\_viewport\_img – Returns 1200px image

-   t\_xl\_viewport\_img – Returns 1500px image

**<u>Aspect Ratios</u>**

-   t\_1\_1\_aspect\_ratio – Crops image to 1:1

-   t\_16\_9\_aspect\_ratio – Crops image to 16:9

-   t\_4\_3\_aspect\_ratio – Crops image to 4:3

-   t\_3\_2\_aspect\_ratio – Crops image to 3:2

-   t\_8\_5\_aspect\_ratio – Crops image to 8 :5

-   t\_7\_4\_aspect\_ratio – Crops image to 7:4

-   t\_8\_3\_aspect\_ratio – Crops image to 8:3

> Note : add "\_center” at the end to set gravity to “center”, default
> is “auto”. Example: “t\_8\_3\_aspect\_ratio\_center”
