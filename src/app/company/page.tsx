"use client";

import React, { useEffect } from "react";
import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { Screen } from "@/components/screen";
import { Text } from "@/components/themed";
import { useIsMobile } from "@/hooks/use.platform.detection";
import { useSizes } from "@/constants/sizes";
import { colors } from "@/constants/colors";
import fonts from "@/constants/fonts";
import Link from "next/link";
import Image from "next/image";

export default function CompanyPage() {
    const isMobile = useIsMobile();
    const sizes = useSizes();

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        const prevHtmlOverflowY = html.style.overflowY;
        const prevBodyOverflowY = body.style.overflowY;
        const prevHtmlHeight = html.style.height;
        const prevBodyHeight = body.style.height;
        const prevHtmlMaxHeight = html.style.maxHeight;
        const prevBodyMaxHeight = body.style.maxHeight;

        html.style.overflowY = "auto";
        body.style.overflowY = "auto";
        html.style.height = "auto";
        body.style.height = "auto";
        html.style.maxHeight = "none";
        body.style.maxHeight = "none";

        return () => {
            html.style.overflowY = prevHtmlOverflowY;
            body.style.overflowY = prevBodyOverflowY;
            html.style.height = prevHtmlHeight;
            body.style.height = prevBodyHeight;
            html.style.maxHeight = prevHtmlMaxHeight;
            body.style.maxHeight = prevBodyMaxHeight;
        };
    }, []);

    const pageStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        height: "auto",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
    };

    const contentWrapStyle: React.CSSProperties = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBlock: isMobile ? sizes.paddings[20] : sizes.paddings[40],
    };

    const contentStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: 900,
        paddingInline: isMobile ? sizes.paddings[20] : sizes.paddings[28],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: isMobile ? sizes.paddings[10] * 1.2 : sizes.paddings[10] * 1.6,
        textAlign: "left",
    };

    const titleStyle: React.CSSProperties = {
        fontFamily: fonts.family.Black,
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title1 * 1.2 : fonts.size.title2 * 1.6,
        lineHeight: 1.1,
        color: colors.gray.white,
    };

    const subtitleStyle: React.CSSProperties = {
        fontFamily: fonts.family.Bold,
        fontWeight: "bold",
        fontSize: isMobile ? fonts.size.title3 : fonts.size.title2,
        lineHeight: 1.2,
        color: colors.gray.white,
        marginTop: isMobile
            ? sizes.paddings[10] * 0.8
            : sizes.paddings[10] * 1.2,
    };

    const paragraphStyle: React.CSSProperties = {
        fontFamily: fonts.family.Medium ?? fonts.family.Semibold,
        fontSize: isMobile ? fonts.size.body * 0.95 : fonts.size.body * 1.05,
        lineHeight: 1.6,
        color: colors.gray[4],
        maxWidth: 860,
    };

    function RenderLogo() {
        return (
            <Link href="/">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Image
                        src="/icons/png/circleApp-iOS-Default-1024x1024@1x.png"
                        alt="Circle Logo"
                        width={34}
                        height={34}
                        style={{ height: 34, width: "auto" }}
                        priority
                    />
                </div>
            </Link>
        );
    }

    return (
        <div style={pageStyle}>
            <div style={contentWrapStyle}>
                <div style={contentStyle}>
                    <Image
                        src="/icons/png/circleApp-iOS-Default-1024x1024@1x.png"
                        alt="Circle Logo"
                        width={55}
                        height={55}
                        style={{ height: 55, width: "auto" }}
                        priority
                    />
                    <Text style={titleStyle}>Why We Started Circle App</Text>

                    <Text as="p" style={paragraphStyle}>
                        Retro is a social app that feels like a joy, not a
                        habit. It’s a friends-only photo journal where you share
                        for yourself as much as your friends. It gently nudges
                        you to find at least one moment each week to remember
                        and then put that moment out there in a post so your
                        friends know what you’re up to.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        One early indicator that we’re on the right track is
                        that our friends that deeply value privacy and safety
                        feel comfortable enough to share photos of their kids’
                        faces and flight itineraries and wild parties — things
                        they wouldn’t feel comfortable sharing elsewhere.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        We started working on it when we realized something:
                        after all that has been built in social since the
                        iPhone, we now see less of our friends on social than we
                        did 5 years ago. The apps that have traditionally served
                        this purpose well have pivoted toward entertainment
                        created by people you don’t know, and even though this
                        content is entertaining, it also crowds out the other
                        content that friends share with each other. So now we’re
                        left sorting through a ton of message threads to see
                        what’s going on with friends, or most commonly, we just
                        don’t get that update at all. That’s a superpower lost.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        Even though consumer social is insanely hard, we decided
                        to do this together because it’s the app we wanted for
                        ourselves, and we think it’s important that people have
                        a place that remains dedicated to being the best place
                        to catch up with friends and family.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        So give it a whirl! If you’ve taken a photo on your
                        iPhone in the last month, you have enough to get
                        started. And as you use it over the course of a couple
                        weeks, we hope it helps you appreciate moments big and
                        small in your own life and in the lives of your friends
                        and family.
                    </Text>

                    <Text style={subtitleStyle}>The Ethos Behind Retro</Text>

                    <Text as="p" style={paragraphStyle}>
                        We’re an ethos-driven company, and for Retro, we wanted
                        to capture some of the guiding ideas that went into this
                        first version of Retro:
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        1/ Remembering and appreciating life is an active
                        process. Ferris Bueller was right: “Life moves pretty
                        fast. If you don’t stop and look around once in a while,
                        you could miss it.” You’re likely already taking a ton
                        of photos and videos on your camera phone. Retro helps
                        you to pick the ones that you’ll want to remember each
                        week so that you can look back on your weeks and
                        appreciate all that has happened.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        2/ Social apps are better when everyone participates.
                        Who wants to go out on a limb to share something small
                        from their day when no one else is sharing small
                        moments? Posting can sometimes make you feel vulnerable,
                        like you’re the only one on the dance floor, and it’s so
                        much better when all your friends on are the dance floor
                        together. Retro gets everyone on the dance floor by
                        nudging everyone to share at least once a week.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        3/ The ability to keep up with your extended circle of
                        friends is a superpower. When your phone started
                        shipping with a high quality camera, you suddenly had
                        this amazing ability to see and be seen by almost all of
                        the people you care about. That’s magic. But that magic
                        is lost if there’s not a space that makes sharing those
                        moments comfortable. Retro want to retrieve and sustain
                        that super power for people.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        4/ Your apps should respect your intention and your
                        attention. If you’re opening an app to see friends and
                        family, it should be easy to see family and friends
                        first. And you shouldn’t have to wade through a sea of
                        other content and fall down rabbit holes just to get
                        there. You should be able to close the app session and
                        feel like you got exactly what you were looking for.
                    </Text>

                    <Text as="p" style={paragraphStyle}>
                        5/ Craft means optimizing for people, not business. We
                        appreciate the need to create a business, and Retro must
                        become a profitable business if our larger company is
                        going to serve the world in the way we hope. But we
                        think there’s a difference between creating a thriving
                        business and optimizing every pixel in your app for a
                        business outcome. We’re optimizing for people first. In
                        every detail of our product, we want you to see the
                        fingerprints of a team that cares about your delight as
                        an end in itself.
                    </Text>
                </div>
            </div>
            <Footer />
        </div>
    );
}
