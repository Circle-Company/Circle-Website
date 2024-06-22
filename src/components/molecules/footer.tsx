export function Footer() {

    const footerList = [
        {title: 'Community Guidelines', link: 'community-guidelines'},
        {title: 'Privacy Policy', link: 'privacy-policy'},
        {title: 'Terms of Service', link: 'terms-of-service'}
    ]

    const container = {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40
    }
    return (
        <div style={container}>
          {footerList.map((item, index) => (
            <a
              key={index}
              href={item.link}
              style={{ marginRight: index < footerList.length - 1 ? '44px' : '0' }}
              className="text-12px text-footerText font-sf-pro hover:text-action transition-colors"
            >
              {item.title}
            </a>
          ))}
        </div>
      );
    }