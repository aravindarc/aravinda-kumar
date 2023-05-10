# Kong

Kong API Gateway offers out of box authentication, security, transformations, introspections and observability plugins. If 
you're looking for an API Gateway setup for your organization Kong is a good choice when compared to other Gateways because
of it's extensive plugins support. But there are very limited literature around the Architecture and Deployment model of 
Kong online.

In this post we'll look at different architectures and deployment strategies for Kong API Gateway.

## Do you need an API Gateway?

Before starting on implementation you should answer these question
* **How many services are there in your organization?**, if you have less than 5 services, an API Gateway might be an
overkill.
* **Do you have the team to maintain and operate the Gateway?**, if you have a small team operating separately and don't 
have the resources to maintain Gateway, then you might have to rethink, since Gateway can become bloated and lead to a single 
point of failure.
* **Can you afford an API Gateway?**, although there are OSS API Gateways, they don't have some important features. At some
point you might have to move to an Enterprise Version, and API Gateways are usually very pricey.

# Common Kong Architectures
## Kong Standalone

This is the simplest architecture, you can deploy a single instance of Kong, which will proxy your network traffic and act
as your entrypoint.