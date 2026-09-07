<template>
    <nav>
        <div class="flex flex-row space-between align-center pv3 ph6 header">
            <div class="flex flex-row flex-start menu-bar">
                
                <!---
                <p><a href="/" class="menu-item" exact-active-class="active">APPLY</a></p>
                --->
            </div>
            <div class="text-center margin-a">
                <!-- Deliberately a single source, no srcset. .logo is a percentage
                     width inside a shrink-to-fit flex parent, so the image's
                     intrinsic width feeds back into the layout; a srcset changes
                     that intrinsic width (it is divided by the selected density)
                     and shrinks the logo on mobile. At 27KB there is nothing to
                     gain from serving smaller variants here. -->
                <a href="/"><img
                    class="logo"
                    src="/img/starlaces-960.webp"
                    alt="star laces llc"
                    width="2342"
                    height="510"
                    fetchpriority="high"
                ></a>
                
            </div>
            <div class="flex flex-end menu-bar">
                
                <!---
                <p><a href="/" class="menu-item" exact-active-class="active">ABOUT</a></p>
                <p><a href="/cart" class="menu-item" exact-active-class="active">CART</a></p>
                --->
            </div>
        </div>
        <div class="shop-button">
            <p><a href="/shop" class="menu-item" exact-active-class="active">SHOP</a></p>
        </div>
    </nav>
</template>
